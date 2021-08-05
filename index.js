const express = require("express");
const app = express();
const service = require("./service");
const { join } = require("path");

const key = process.env.KEY;

if (!key) {
    console.error("No API key specified! Please specify in Environment before starting server.");
    process.exit(1);
}


const port = process.env.PORT || 8080;

app.use(express.static("./web"));

app.get('/jquery.js', (req, res) => {
    const jqueryPath = join(__dirname, "node_modules", "jquery", "dist", "jquery.min.js");
    res.sendFile(jqueryPath);
});

app.get('/bitcoin', (req, res) => {
    service.getBtc().then((rates) => {
        res.json(rates);
    }).catch((err) => {
        console.error(err);
    });
});

app.get('/litecoin', (req, res) => {
    service.getLtc().then((rates) => {
        res.json(rates);
    }).catch((err) => {
        console.error(err);
    });
});

app.get('/ethereum', (req, res) => {
    service.getEth().then((rates) => {
        res.json(rates);
    }).catch((err) => {
        console.error(err);
    });
});

app.get('/dogecoin', (req, res) => {
    service.getDoge().then((rates) => {
        res.json(rates);
    }).catch((err) => {
        console.error(err);
    });
});

app.listen(port, () => {
    console.log(`CoinFace Server Started on 0.0.0.0:${port}`);
});
