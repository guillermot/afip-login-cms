const soap = require('soap');

const wsdl = 'https://wsaahomo.afip.gov.ar/ws/services/LoginCms?WSDL';
const endpoint = 'https://wsaahomo.afip.gov.ar/ws/services/LoginCms';

module.exports = data => {
    soap.createClient(wsdl, { endpoing: endpoint }, (err, client) => {
        client.loginCms({ in0: data }, (err, result, raw, soapHeader) => {
            if (err) {
                console.log(err);
                return;
            }

            console.log(result);
        });
    });
};