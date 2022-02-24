const http = require('http');
const fs = require('fs');
const qs = require("querystring");

const ip = '127.0.0.1';
const port = 3000;

const sendRespond = (fileName, statusCode, respond) => {
    fs.readFile(`./html/${fileName}`, (error, data) => {
        if (error) {
            respond.statusCode = 500;
            respond.setHeader('Content-Type', 'text/plain');
            respond.end('Sorry, is error!');
        } else {
            respond.statusCode = statusCode;
            respond.setHeader('Content-Type', 'text/html');
            respond.end(data);
        }
    })
};

const server = http.createServer((request, respond) => {
    let url = request.url;
    const method = request.method;

    if (method === 'GET') {
        const requestUrl = new URL(url, `http://${ip}:${port}`);
        const lang = requestUrl.searchParams.get('lang');
        let language = '';

        url = requestUrl.pathname;

        if (lang === null || lang === 'en') {
            language = '';
        }
        if (lang === 'zh') {
            language = '-zh';
        } else {
            language = '';
        }

        if (url === '/') {
            sendRespond(`index${language}.html`, 200, respond);
        } else if (url === '/about.html') {
            sendRespond(`about${language}.html`, 200, respond);
        } else if (url === '/login.html') {
            sendRespond(`login${language}.html`, 200, respond);
        } else if (url === '/login-success.html') {
            sendRespond(`login-success.html`, 200, respond);
        } else if (url === '/login-fail.html') {
            sendRespond(`login-fail.html`, 200, respond);
        } else {
            sendRespond(`404${language}.html`, 200, respond);
        }
    } else {
        if (url === '/process-login') {
            let body = [];

            request.on('data', (chunk) => {
                body.push(chunk);
            });

            request.on('end', () => {
                body = Buffer.concat(body).toString();
                body = qs.parse(body);
                console.log(body);

                if (body.username === 'test' && body.password === '123') {
                    respond.statusCode = 301;
                    respond.setHeader('Location', '/login-success.html');
                } else {
                    respond.statusCode = 301;
                    respond.setHeader('Location', '/login-fail.html');
                }

                respond.end();
            });
        }
    }

    // respond.end('hello is end');
});

const start = function () {
    server.listen(port, ip, () => {
        console.log('is run base on port 3000');
    });
}


module.exports = start;


