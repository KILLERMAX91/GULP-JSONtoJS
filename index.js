// through2 is a thin wrapper around node transform streams
var through = require('through2');

var Path = require('path');
var OBJ_GLOBAL = {
    nameVariableSufix:''
};

/**
 * First letter upper case
 * @param string
 * @returns {string}
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
/**
 * First letter lower case
 * @param string
 * @returns {string}
 */
function lowerFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}


function getName(file){

    var ext = Path.extname(file.path);
    var name = Path.basename(file.path, ext);
    var tab = name.split('.');
    name = '';
    if(tab.length==2){
        name = tab[0];
    }else{
        name = tab[0];
        for(var i=1;i<tab.length-1;i++){
            name += capitalizeFirstLetter(tab[i]);
        }
    }

    return name;
}

function setWriteFile(file){
    var prefixText = 'var '+lowerFirstLetter(getName(file))+OBJ_GLOBAL.nameVariableSufix+' =';
    var sufixText = ";";


    prefixText = new Buffer(prefixText); // allocate ahead of time
    sufixText = new Buffer(sufixText); // allocate ahead of time

    if (file.isBuffer()) {
        file.contents = Buffer.concat([prefixText, file.contents]);
        file.contents = Buffer.concat([file.contents, sufixText]);
    }

}
function setRameFile(file){
    path = getName(file)+'.js';
    file.path = Path.join(file.base, path);
}


// Plugin level function(dealing with files)
function gulpJsonToJs(obj) {

    if(typeof obj !== 'undefined' && typeof obj.nameVariableSufix === "string" && /^[a-z0-9A-Z\_]+$/.test(obj.nameVariableSufix)){
        OBJ_GLOBAL.nameVariableSufix = obj.nameVariableSufix;
    }


    // Creating a stream through which each file will pass
    return through.obj(function(file, enc, cb) {
        //print('ddd');

        if (file.isNull()) {
            // return empty file
            return cb(null, file);
        }
        setRameFile(file);
        setWriteFile(file);



        cb(null, file);

    });

}

// Exporting the plugin main function
module.exports = gulpJsonToJs;