const pem = require("pem");
const fs = require("fs");
const opensslSigner = require("./openssl-signer");
const wsaa = require("./afip-wsaa");

pem.config({
    pathOpenSSL: 'C:\\OpenSSL-Win32\\bin\\openssl.exe'
});

const config = {
    fileContentPath: 'C:\\projects\\afip-login-cms\\LoginTicketRequest.xml',
    key: 'C:\\projects\\afip-login-cms\\MiClavePrivada',
    cert: 'C:\\projects\\afip-login-cms\\certificado.pem'
};

opensslSigner(config)
    .then(result => {
        wsaa(result);
    });