#### Express应用生成器
所谓Express应用生成器是指可以使用'express-generator'插件生成基于express的工程项目，使用步骤如下

安装应用生成器
```javascript
$ npm install express-generator -g
```

在当前目录下生成一个项目
```javascript
$ express my-express
```

进入该项目目录，并安装依赖
```javascript
$ cd my-express

$ npm install
```

启动该项目
```javascript
$ npm start
```


#### Express路由
路由是由一个URI和一个特定的HTTP方法(GET,POST等)组成的。用于处理应用如何响应客户端对某个网站节点的访问。

每个路由都可以有一个或者多个处理器函数，当匹配到路由时，这些处理器函数将被执行。

路由的定义由如下结构组成：app.METHOD(PATH, HANDLER)
- app是一个Express实例
- METHOD是某个HTTP请求方法
- PATH是服务器端的路径
- HANDLER是当路由匹配到时需要执行的函数

路由实例如下
```javascript
// 访问网站首页返回'Hello'
app.get('/', functioin(req, res) {
    res.send('Hello')
})

```


#### 静态文件托管
通过设置静态文件的托管，就可以在客户端通过路径访问到静态文件。

Express提供了express.static的静态方法可以方便的托管静态文件，将静态资源文件所在的目录作为参数传递给 express.static 中间件就可以提供静态资源文件的访问了。
```javascript
app.use(express.static(path.join(__dirname, 'public')))
```

这样，public目录下的静态文件就可以访问了
```javascript
// 所有文件的路径都是相对于存放目录的，因此，存放静态文件的目录名不会出现在 URL 中
http://localhost:3000/css/style.css

http://localhost:3000/js/app.js
```

如果静态资源存放在多个目录下面，你可以多次调用express.static中间件
```javascript
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.static(path.join(__dirname, 'files')))
```

**虚拟目录**

如果你希望所有通过express.static访问的文件都存放在一个“虚拟（virtual）”目录（即目录根本不存在）下面，可以通过为静态资源目录指定一个挂载路径的方式来实现
```javascript
app.use('/static', express.static(path.join(__dirname, 'public')))
```

这样就可以通过带有 “/static” 前缀的地址来访问 public 目录下面的文件了
```javascript
http://localhost:3000/static/css/style.css

http://localhost:3000/static/js/app.js
```


#### Express的两个问题
1.处理404.在 Express 中，404并不是一个错误（error）。因此，错误处理器中间件并不捕获404。这是因为404只是意味着某些功能没有实现。也就是说，Express执行了所有中间件、路由之后还是没有获取到任何输出。你所需要做的就是在其所有他中间件的后面添加一个处理404的中间件。
```javascript
app.use(function(req, res, next) {
    res.status(404).send('404, Not-Found!')
})
```

2.设置一个错误处理器。错误处理器中间件的定义和其他中间件一样，唯一的区别是4个而不是3个参数，即 (err, req, res, next)。
```javascript
app.use(function(err, req, res, next) {
    res.status(500)
    res.send('500, Error!')
})
```

