//引入http模块
var http = require('http');

//fs模块
var fs = require('fs');

//path
var path =require('path');

var mimes=require('./model/getmime.js');

http.createServer(function (req, res) {

    var pathname = req.url;
    if (pathname == '/') {
        pathname = '/index.html';
        /*默认加载的首页*/
    }

    //获取请求文件的后缀名
    var extname=path.extname(pathname);

    if (pathname != '/favicon.ico') {  /*过滤请求favicon.ico*/
        console.log(pathname);
        //文件操作获取 static下面的index.html
        fs.readFile('webs' + pathname,function(err,data){

            if(err){  /*没有这个文件*/
                //返回404页面
                console.log('404');
                fs.readFile('static/404.html',function(error,data404){
                    if(error){
                        console.log(error);
                        res.end(); /*结束响应*/
                    }
                    res.writeHead(404,{"Content-Type":"text/html;charset='utf-8'"});
                    res.write(data404);
                    res.end(); /*结束响应*/
                })

            }else{ /*返回这个文件*/
                var mime=mimes.getMime(extname);
                res.writeHead(200,{"Content-Type":""+mime+";charset='utf-8'"});
                res.write(data);
                res.end(); /*结束响应*/
            }

        })
    }

}).listen(8080);