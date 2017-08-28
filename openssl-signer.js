var util = require('util');
var spawn = require('child_process').execSync;

module.exports = options => {
    return new Promise(function(resolve, reject) {
        options = options || {};

        if (!options.content && !options.fileContentPath)
            reject('Invalid content.');

        if (!options.key)
            reject('Invalid key.');

        if (!options.cert)
            reject('Invalid certificate.');

        //var commadText = 'C:\\OpenSSL-Win32\\bin\\openssl.exe smime -in %s -sign -signer %s -inkey %s -outform DER -nodetach';
        var commadText = 'C:\\OpenSSL-Win32\\bin\\openssl.exe smime -in %s -sign -signer %s -inkey %s -out C:\\temp\\signed-data-2.txt';
        var content = options.fileContentPath;

        if (options.content) {
            // commadText = 'echo "%s" | C:\\OpenSSL-Win32\\bin\\openssl.exe smime -sign -signer %s -inkey %s -outform DER -nodetach';
            commadText = 'echo %s | C:\\OpenSSL-Win32\\bin\\openssl.exe smime -sign -signer %s -inkey %s -out C:\\temp\\signed-data.txt';
            content = options.content.replace(/[<]/g, '^<').replace(/[>]/g, '^>');

        }

        var command = util.format(
            commadText,
            content,
            options.cert,
            options.key
        );
        console.log(command);
        if (options.password)
            command += util.format(' -passin pass:%s', options.password);

        //console.info(command);

        var child = spawn(command);

        var enc = child.toString('base64');

        resolve(enc);
    });
};