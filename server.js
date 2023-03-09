const http = require('http');
const url = require('url');
const fs = require('fs');
const querystring = require('querystring');
require('dotenv').config();

const ratio = require("./my_modules/ratio");

const port = process.env.PORT || 3000;
const host = '127.0.0.1';

const pathRatio = "/contrast-ratio";


const server = http.createServer((req, res) =>  {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    const parsedUrl = url.parse(req.url);
    const pathname = parsedUrl.pathname;
    const parsedQuery = querystring.parse(parsedUrl.query);

    const background = parsedQuery.background;
    const foreground = parsedQuery.foreground;

    if(pathname === pathRatio && background && foreground) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(ratio(foreground, background)));
    }else {if(pathname === "/") {
        res.statusCode = 200;
        fs.readFile('index.html', 'utf8', (err, data) => {
            if (err) throw err;
            res.end(data);
        });
    }else {
        res.statusCode = 404;
        res.end('404 not found');
    }
    }
});

server.listen(port, host, () => {
    console.log(`Serveur démarré sur http://${host}:${port} `);
})