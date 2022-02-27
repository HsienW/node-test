const http = require('http');
const fs = require('fs');
const qs = require('querystring');
// crypto 模塊提供了加密功能，其中包括了用於 OpenSSL 散列、HMAC、加密、解密、簽名、以及驗證的函數的一整套封裝
const crypto = require('crypto');

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
            respond.end(`
                <!DOCTYPE html>
                    <html lang='en'>
                    <head>
                        <meta charset='utf-8'>
                        <title>TEST</title>
                    </head>
                    <body>
                    <div>test</div>
                    <script></script>
                    </body>
                </html>
            `)
            // respond.end(data);
        }
    })
};

function updateTime() {
    setInterval(() => this.time = new Date().toUTCString(), 1000)
    return this.time
}

const server = http.createServer((request, respond) => {
        let url = request.url;
        const method = request.method;

        console.log('url:', `${request.method} ${request.url} `);
        // 設定 Expires
        // respond.setHeader('Expires', new Date(Date.now() + 10 * 1000).toUTCString());

        // 設定 cache-control
        // respond.setHeader('Cache-Control', 'max-age=20')

        // 設定 last-modified
        // respond.setHeader('Cache-Control', 'no-cache');
        // respond.setHeader('last-modified', new Date().toUTCString());
        // if (new Date(request.headers['if-modified-since']).getTime() + 3 * 1000 > Date.now()) {
        //     console.log('協商緩存有中....')
        //     respond.statusCode = 304;
        //     respond.end();
        //     return
        // }

        // 設定 etag
        // respond.setHeader('Cache-Control', 'no-cache')
        // // 透過 hash 加密產生 當作 etag 的 hash key
        // const hash = crypto.createHash('sha1').update('index.html').digest('hex');
        // respond.setHeader('Etag', hash);
        //
        // if(request.headers['if-none-match'] === hash){
        //     console.log('Etag 協商有中....');
        //     respond.statusCode = 304;
        //     respond.end();
        //     return
        // }

        // const {url} = req
        if ('/' === url) {
            respond.end(`
            <html lang="en">
                <!-- <meta http-equiv='Refresh' content='5' /> -->
                Html Update Time: ${updateTime()}
                <script src='main.js'>
                    console.log('244444');
                    let xhr = new XMLHttpRequest()
                    xhr.onreadystatechange = () => {
                        if (xhr.readyState === 4){
                            console.log('request ' + xhr.status + ' ' +xhr.responseText)
                        }
                    }
                
                    setInterval(() => {
                        xhr.open('GET', '/index.js', true);
                        xhr.send()
                    },1000)
                </script>
            </html>
            `)
        } else if (url === '/main.js') {

            respond.statusCode = 200
            respond.end(`
                <html lang="en">
                <head>
                    <meta charset="utf-8">
                    <title>Home</title>
                </head>
                <body>
                <div>Home Page</div>
                <script>
                </script>
                </body>
                </html>
            `);

            // const content = `document.writeln('<br>JS   Update Time:${updateTime()}')`
            //
            // respond.statusCode = 200
            // respond.end(content)
        } else if (url === '/favicon.ico') {
            console.log('favicon..')
            respond.end('')
        }

// if (method === 'GET') {
//     const requestUrl = new URL(url, `http://${ip}:${port}`);
//     const lang = requestUrl.searchParams.get('lang');
//     let language = '';
//
//     url = requestUrl.pathname;
//
//     if (lang === null || lang === 'en') {
//         language = '';
//     }
//     if (lang === 'zh') {
//         language = '-zh';
//     } else {
//         language = '';
//     }
//
//     if (url === '/') {
//         sendRespond(`/html/index${language}.html`, 200, respond);
//     } else if (url === '/html/about.html') {
//         sendRespond(`about${language}.html`, 200, respond);
//     } else if (url === '/html/login.html') {
//         sendRespond(`login${language}.html`, 200, respond);
//     } else if (url === '/html/login-success.html') {
//         sendRespond(`login-success.html`, 200, respond);
//     } else if (url === '/html/login-fail.html') {
//         sendRespond(`/html/login-fail.html`, 200, respond);
//     } else {
//         sendRespond(`/html/404${language}.html`, 200, respond);
//     }
// } else {
//     if (url === '/process-login') {
//         let body = [];
//
//         request.on('data', (chunk) => {
//             body.push(chunk);
//         });
//
//         request.on('end', () => {
//             body = Buffer.concat(body).toString();
//             body = qs.parse(body);
//             console.log(body);
//
//             if (body.username === 'test' && body.password === '123') {
//                 respond.statusCode = 301;
//                 respond.setHeader('Location', '/html//login-success.html');
//             } else {
//                 respond.statusCode = 301;
//                 respond.setHeader('Location', '/html//login-fail.html');
//             }
//
//             respond.end();
//         });
//     }
// }

// respond.end('hello is end');
    })
;

const start = function () {
    server.listen(port, ip, () => {
        console.log('is run base on port 3000');
    });
}


module.exports = start;


