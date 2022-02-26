const start = require('./server');
const fs = require('fs');
let data = '';

// 導入 events module
const events = require('events');

start();

// 建立 Emitter 實例
// const eventEmitter = new events.EventEmitter();
//
// const connectHandler = function connected() {
//     console.log('連接成功');
//     eventEmitter.emit('data_received');
// }
//
// // 绑定 connection 事件
// eventEmitter.on('connection', connectHandler);
//
// // 監聽 data_received 的事件觸發
// eventEmitter.on('data_received', function(){
//     console.log('監聽到了');
// });
//
// eventEmitter.emit('connection');
//
// // console.log('結束');
//
// // Stream 測試
// const readerStream = fs.createReadStream('input.txt');
//
// readerStream.setEncoding('utf8');
//
// readerStream.on('data', function(chunk) {
//     console.log('==== 監聽 ====');
//     data += chunk;
//     console.log(data);
// });
//
// readerStream.on('end',function(){
//     console.log('==== end ====');
//     console.log(data);
// });
//
// readerStream.on('error', function(err){
//     console.log(err.stack);
// });


