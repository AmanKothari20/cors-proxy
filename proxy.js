const express = require('express'),
    request = require('request'),
    bodyParser = require('body-parser'),
    fetch = require('node-fetch'),
    cors = require('cors'),
    RSSParser = require('rss-parser')
    app = express();


app.use(cors());
app.get("/rss", async (req, res) => {
    let parser = new RSSParser();
    parser.parseURL('https://maqconsulting.catsone.com/xml/index.php?siteID=5046&portalID=850&subdomain=maqconsulting&num=200&key=1687404562863')
        .then(feed => {
            res.json(feed);
        })
        .catch(error => {
            console.error(error);
        });
})
app.get("/", async (req, res) => {
    res.json({test:"hello"})
})
const port = process.env.PORT || 8080
app.listen(port, (err,res) => {
    if(err){
        console.log(err)
        return res.status(500).send(err.message)
    }else{
        console.log("listening on port :",port);
    }
})
