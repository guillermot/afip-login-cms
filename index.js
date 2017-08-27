const pem = require("pem");
const fs = require("fs");
const opensslSigner = require("./openssl-signer");
const wsaa = require("./afip-wsaa");

pem.config({
    pathOpenSSL: 'C:\\OpenSSL-Win32\\bin\\openssl.exe'
});

const content = '<loginTicketRequest><header><uniqueId>1</uniqueId><generationTime>2017-08-26T23:50:46</generationTime><expirationTime>2017-08-27T23:10:46</expirationTime></header><service>wsfe</service></loginTicketRequest>';
const config = {
    content: content,
    fileContentPath: 'C:\\projects\\afip-login-cms\\LoginTicketRequest.xml',
    key: 'C:\\projects\\afip-login-cms\\MiClavePrivada',
    cert: 'C:\\projects\\afip-login-cms\\certificado.pem'
};

opensslSigner(config)
    .then(result => {
        wsaa(result);
    });