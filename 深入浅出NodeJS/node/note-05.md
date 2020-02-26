### 网络编程
Node提供了net, dgram, http, https这4个模块，分别用于处理TCP，UDP，HTTP，HTTPS，适用于服务器端和客户端。

#### TCP服务
TCP全名为传输控制协议，在OSI模型(由七层组成，分别为物理层，数据据链路层，网络层，传输层，会话层，表示层，应用层)中属于传输层协议。
- 应用层：HTTP,SMTP,IMAP等
- 表示层：加密/解密等
- 会话层：通信连接/维持会话
- 传输层：TCP/UDP
- 网络层：IP
- 链路层：网络特有的链路接口
- 物理层：网络物理硬件

创建TCP服务
```javascript
let net = require('net')

let server = net.createServer(function(socket) {
    // 新的连接
    socket.on('data', function(data) {
        socket.write('hello')
    })

    socket.on('end', function() {
        console.log('break...')
    })
})

sever.listen(9527, function() {
    console.log('server bound')
})
```


#### UDP服务
UDP又称为用户数据包协议，与TCP同属于网络传输层。UDP与TCP最大的不同是UDP不是面向连接的。TCP一旦建立连接，所有的会话都基于连接完成，客户端如果要与另一个TCP通信，需要创建另一个套接字来完成。UDP中一个套接字可以与多个UDP服务通信，无需连接，资源消耗低，处理快速且灵活，应用于哪种偶尔丢一两个数据包也不会产生重大影响的场景。


#### HTTP服务
```javascript
const http = require('http')

http.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    })

    res.end('Hello World')
})


http.listen(8000)
```

#### 网络服务与安全
Node在网络安全上提供了3个模块，crypto,tls,https。

TSL/SSL是一个公钥/私钥的结构，它是一个非对称的结构，每个服务器和客户端都有自己的公私钥。公钥用来加密要传输的数据，私钥用来解密接收到的数据。公钥和私钥是配对的，通过公钥加密的数据，只有通过私钥才能解密。

在建立安全传输之前，服务端和客户端要互换公钥。客户端发送数据的时候要通过服务器的公钥进行加密，服务器发送数据的时候要客户端的公钥进行加密。

数字证书(CA)
- CA的作用是为站点颁发证书，这个证书中有CA通过自己的公钥和私钥实现的签名
- 服务器通过自己的私钥生成CSR文件，CA机构将通过这个文件办法属于该服务器的签名证书
- 客户端在发起安全连接前会去获取服务器的证书，并通过CA的证书验证服务器端证书的真伪
- 如果是知名的CA机构，它们的证书一般会预装在浏览器中


#### HTTPS服务
HTTPS就是工作在TLS/SSL上的HTTP。

