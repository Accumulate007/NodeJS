
/**
 * web请求的过程
 * 1.浏览器发送http请求到指定的主机
 * 2.主机接收到该请求，对该请求进行分析处理
 * 3.服务器处理完成后，返回对应的结果给浏览器
 * 4.浏览器接收到服务器的响应结果后，根据接收到的数据进行分析处理
 * 
 */

// 搭建一个web服务器

const http = require('http')
const url = require('url')
const qs = require('querystring')

const server = http.createServer()


server.on('request', function(req, res) {
    console.log('有客户端发起了请求...')

    // 获取用户访问方式
    let method = req.method

    // 获取用户访问的接口
    let urlString = url.parse(req.url)

    let pathName = urlString.pathname

    switch(pathName) {
        case '/':
            console.log('访问了首页')
            break;
        case '/user':
            console.log('访问了用户页面')
            break;
        default:
            console.log('404 Not Found')
    }

    // 给客户端返回信息
    res.writeHead(200, 'some-words', {
        'Content-Type': 'text/html'
    })
    res.write('<h2>hello, This is NodeJS</h2>')
    res.end()
})



// 网卡是一个大的通道，数据都从这里进来。但是，在网卡下又需要有端口，让不同的程序监听不同的端口，获取对应的数据。
server.listen(8096, 'localhost')

