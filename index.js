const express = require("express");
const app = express();
const service = require("./service");

const key = process.env.KEY;

if (!key) {
    console.error("No API key specified! Please specify in Environment before starting server.");
    process.exit(1);
}


const port = process.env.PORT || 8080;

app.use(express.static("./web"));

app.get('/bitcoin', (req, res) => {
    service.getBtc().then((rates) => {
        res.json(rates);
    });
});

app.listen(port, () => {
    console.log(`CoinFace Server Started on 0.0.0.0:${port}`);
});