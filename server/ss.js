let path = require("path");
let fs = require("fs");
let url = require("url");

let mime = require("./mime.json");

let serverStatic = (request,response,root=".") => {
	let urlObject = url.parse(request.url,true);
	let pathName = urlObject.pathname;
	// 新增需求：请求地址路径不包含文件后缀则以index.html返回
	if(!path.extname(pathName)) {
		response.writeHead(301,{'Location': 'http://172.26.80.54/index/index.html'});
		return response.end();
	}
	let filePath = pathName;
	fs.readFile(path.join(root,filePath),(error,fileContent) => {
		if(error) {
			response.writeHead(404,{"content-type":"text/plain;charset:utf-8;"});
			response.end(null);
		}
		let extname = path.extname(filePath);
		let mimeType = "text/html";
		if(mime[extname]){
			mimeType = mime[extname]
		};
		if(mimeType.startsWith("text")){
			mimeType += ";charset:utf-8;"
		}
		response.writeHead(200,{"content-type":mimeType});
		response.end(fileContent);
	})
};
exports.serverStatic = serverStatic;