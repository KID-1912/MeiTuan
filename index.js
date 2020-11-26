const http = require("http");
const ss = require("./server/ss.js");

let server = http.createServer((req,res) => {
  // 资源分发
  ss.serverStatic(req,res,__dirname);//第3参为资源目录根路径,默认为服务器根路径
}).listen("80","172.26.80.54",() => {
  console.log("running");
})