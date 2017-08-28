const pem = require("pem");
const fs = require("fs");
const opensslSigner = require("./openssl-signer");
const wsaa = require("./afip-wsaa");

pem.config({
    pathOpenSSL: 'C:\\OpenSSL-Win32\\bin\\openssl.exe'
});

const config = {
    content: '<loginTicketRequest><header><uniqueId>1</uniqueId><generationTime>2017-08-28T08:50:46</generationTime><expirationTime>2017-08-29T07:50:46</expirationTime></header><service>wsfe</service></loginTicketRequest>',
    key: 'E:\\Guille\\github\\afip-login-cms\\MiClavePrivada',
    cert: 'E:\\Guille\\github\\afip-login-cms\\certificado.pem'
};

opensslSigner(config)
    .then(result => {
        wsaa(result);
    });