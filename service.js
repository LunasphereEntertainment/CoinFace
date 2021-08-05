const Client = require("node-rest-client").Client;
const client = new Client();

const BASE_URL = "http://rest.coinapi.io/"

exports.getBtc = function() {
    const now = new Date();
    const isoString = `${now.getFullYear()}-${now.getUTCMonth()}-${now.getUTCDate()}T00:00:00`;

    return new Promise((resolve, reject) => {
        client.get(`${BASE_URL}/v1/exchangerate/BTC/USD/history?period_id=1HRS&time_end=${isoString}`, {}, (dat, response) => {
            resolve(response);
        });
    });
}