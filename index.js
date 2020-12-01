const http = require("http");
const ss = require("./server/ss.js");

let server = http.createServer((req,res) => {

  // 资源分发
  ss.serverStatic(req,res,__dirname);//第3参为资源目录根路径,默认为服务器根路径

}).listen("80",getIPAdress(),() => {
  console.log("running");
})



// "172.26.80.54"
  function getIPAdress(){
    var interfaces = require('os').networkInterfaces();
    for(var devName in interfaces){
        var iface = interfaces[devName];
        for(var i=0;i<iface.length;i++){
            var alias = iface[i];
            if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                console.log('\nYou can view the website by IP address '+alias.address+ '\n');
                return alias.address;
            }
        }
    }
  }