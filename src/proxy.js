const express = require('express'),
    request = require('request'),
    bodyParser = require('body-parser'),
    fetch = require('node-fetch'),
    cors = require('cors'),
    RSSParser = require('rss-parser'),
    serverless = require('serverless-http'),
    router = express.Router(),
    app = express();

app.use(cors());
app.use('./netlify/functions/proxy',router)
router.get("/rss", async (req, res) => {
    let parser = new RSSParser();
    parser.parseURL('https://maqconsulting.catsone.com/xml/index.php?siteID=5046&portalID=850&subdomain=maqconsulting&num=200&key=1687404562863')
        .then(feed => {
            res.json(feed);
        })
        .catch(error => {
            console.error(error);
        });
})
router.get("/", async (req, res) => {
    res.json({test:"hello"})
})
module.exports.handler = serverless(app);