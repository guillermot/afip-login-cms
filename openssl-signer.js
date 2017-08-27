var util = require('util');
var spawn = require('child_process').execSync;

module.exports = options => {
    return new Promise(function(resolve, reject) {
        options = options || {};

        if (!options.content)
            reject('Invalid content.');

        if (!options.key)
            reject('Invalid key.');

        if (!options.cert)
            reject('Invalid certificate.');

        var command = util.format(
            'C:\\OpenSSL-Win32\\bin\\openssl.exe smime -in %s -sign -signer %s -inkey %s -outform DER -nodetach',
            // options.content.replace(/["']/g, '\\"'),
            options.fileContentPath,
            options.cert,
            options.key
        );

        if (options.password)
            command += util.format(' -passin pass:%s', options.password);

        //console.info(command);

        var child = spawn(command);

        var enc = child.toString('base64');

        resolve(enc);
    });
};