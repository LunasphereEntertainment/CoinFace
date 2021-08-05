const request = require("request-promise");

const BASE_URL = "http://rest.coinapi.io/"

const globalHeaders = {
    "X-CoinAPI-Key": process.env.KEY
}

function padText(str, len) {
    if (typeof str !== "string")
        str = str.toString();

    while (str.length < len) {
        str = "0" + str;
    }
    return str;
}

function toIsoString(dt) {
    const year = dt.getFullYear(),
        month = padText(dt.getUTCMonth() + 1, 2),
        day = padText(dt.getUTCDate(), 2)

    return `${year}-${month}-${day}T00:00:00`;
}

/*const CACHE = {

}*/

function exchangeRatePeriod(coinCode) {
    let start = new Date();
    start.setDate(start.getDate() - 7);
    let end = new Date();

    start = toIsoString(start);
    end = toIsoString(end);

    const url = `${BASE_URL}v1/exchangerate/${coinCode}/USD/history?period_id=1HRS&time_start=${start}&time_end=${end}`;
    console.log(url);

    return request(url, { json: true, headers: globalHeaders });
}


exports.getBtc = function() {
    return exchangeRatePeriod("BTC");
}

exports.getEth = function() {
    return exchangeRatePeriod("ETH");
}

exports.getLtc = function() {
    return exchangeRatePeriod("LTC");
}

exports.getDoge = function() {
    return exchangeRatePeriod("DOGE");
}
