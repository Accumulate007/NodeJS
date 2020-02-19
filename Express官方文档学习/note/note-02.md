#### 路由方法
Express定义了如下和HTTP请求对应的路由方法：get, post, put, head, delete, options, trace, copy, lock, mkcol, move, purge, propfind, proppatch, unlock, report, mkactivity, checkout, merge, m-search, notify, subscribe, unsubscribe, patch, search, 和connect。

使用方法为：
```javascript
app[method]('/', function(req, res) {})

// 例如
app.get('/', function(req, res) {})

app['m-search']('/', function(req, res) {})
```

**app.all()**

app.all()是一个特殊的路由方法，没有任何HTTP方法与其对应，它的作用是对于一个路径上的所有请求加载中间件
```javascript
// 无论请求方法是get,post还是什么，都会执行
app.all('/', function(req, res) {
    console.log('ok')
})
```


#### 路由路径
路由路径和请求方法一起定义了请求的端点，它可以是字符串、字符串模式或者正则表达式。

使用字符串的路由路径
```javascript
// 匹配 /about 路径的请求
app.get('/about', function(req, res) {
    console.log('about')
})
```

使用字符串模式的路由路径
```javascript
// 匹配 acd和abcd
app.get('/ab?cd', function(req, res) {
    res.send('ab?cd')
})

// 匹配 abcd, abbcd等
app.get('/ab+cd', function(req, res) {
    res.send('ab?cd')
})
```

使正则表达式的路由路径
```javascript
// 匹配 chen结尾的路径，例如 coolchen
app.get(/.*chen$/, function(req, res) {
    console.log('.*chen$')
})
```


#### 路由句柄
路由句柄有多种形式，可以是一个函数、一个函数数组，或者是两者混合.

使用一个回调函数处理路由
```javascript
app.get('/about', function(req, res) {
    console.log('about')
})
```

使用多个回调函数处理路由
```javascript
const cb1 = function(req, res) {
    console.log('cb1')
    next()  // 需要指定next,并且在该回调中不能出现 res.send()
}

const cb2 = function(req, res) {
    console.log('cb2')
    next()
}

const cb3 = function(req, res) {
    res.send('Over')    // 返回响应后，后续的回调不起作用
}

// 方式一
app.get('/about', cb1, cb2)


// 方式二
app.get('/about', [cb1, cb2])

// 方式三
app.get('/about', [cb1, cb2], cb3)
```


#### 响应方法
响应方法用于向客户端返回相应，从而终止了某个请求响应的循环。

如果在路由句柄中一个方法也不调用，来自客户端的请求会一直挂起，直到超时。

响应方法如下
- res.download()    提示下载文件
- res.end()         终结响应处理流程
- res.json()        发送一个JSON格式的响应
- res.jsonp()       发送一个支持JSONP的JSON格式的响应
- res.redirect()    重定向请求
- res.send()        发送各种类型的响应
- res.sendFile()    以八位字节流的格式发送文件
- res.sendStatus()  设置响应状态码


#### app.route()
可使用app.route()创建路由路径的链式路由句柄。

使用方式如下
```javascript
app.route('/about')
    .get(function(req, res) {})
    .post(function(req, res) {})
    .put(function(req, res) {})
```

