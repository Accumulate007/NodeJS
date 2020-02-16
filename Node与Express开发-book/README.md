本项目是阅读《Node与Express开发》的笔记

本书使用的工具
- Express
- Handlebars(模板引擎)

#### Express
Express官方文档：http://expressjs.com/api.html

Express源码：https://github.com/visionmedia/express/tree/master

#### URL的组成部分
```javascript
https://www.baidu.com:80/search?test=1#q=express

// 协议 主机名 端口 路径 查询字符串 信息片段

// 路径：是应用中的页面或其它资源的唯一标识
// 查询字符串：以问号(?)开头，键值对则以与号(&)分隔开
// 信息片段：被严格限制在浏览器中使用，不会传递到服务器
```

#### 请求对象(Request)
- req.params：一个数组，包含命名过的路由参数
- req.param(name)：返回命名的路由参数(建议忽略此方法)
- req.query：一个对象，包含以键值对存放的查询字符串参数
- req.body：一个对象，包含POST请求参数
- req.route：关于当前匹配路由的信息
- req.cookies：一个对象，包含从客户端传递过来的cookie值
- req.headers：从客户端接收到的请求报头
- req.acccepts([types])：用来确定客户端是否接受一个或一组指定的类型
- req.ip：客户端的IP地址
- req.path：请求路径(不包含协议、主机、端口或查询字符串)
- req.host：返回客户端所报告的主机名
- req.xhr：如果请求由Ajax发起则返回true
- req.protocol：用于标识请求的协议(http or https)
- req.secure：如果链接是安全的则返回true，等同于 'req.protocol === https'
- req.url：返回路径和查询字符串

#### 响应对象(Response)
- res.status(code)：设置HTTP状态码
- res.set(name, value)：设置响应头
- res.cookie(name, value, [options])：设置或清除客户端cookies值
- res.redirect([status], url)：重定向浏览器
- res.send(body)：向客户端发送响应及可选的状态码
- res.json([status], json)：向客户端发送JSON以及可选的状态码
- res.jsonp(json)：向客户端发送JSONP以及可选的状态码
- res.type(type)：设置Content-Type头信息
- res.format(object)：根据接收请求报头发送不同的内容
- res.attachment([filename])：会将响应报头Content-Disposition设置为attachment，这样浏览器就会选择限制而不是展现内容
- res.sendFile(path, [option], [callback])：根据路径读取指定文件并将内容发送给客户端
- res.links(links)：设置链接响应报头
- res.locals：一个对象，包含用于渲染视图的默认上下文
- res.render(view, [locals], callback)：用于使用配置的模板引擎渲染视图

#### 模板引擎选择的准则
- 性能
- 客户端、服务端兼而有之
- 抽象。让代码更可读


#### 向服务器发送客户端数据
大体上来说有两种方式
- 查询字符串(get)
- 请求正文(post)
如果使用了HTTPS协议，这两者都是安全的，否则都不安全。

#### 表单处理
- form表单默认进行GET提交，想要进行POST提交必须显式修改method属性
- action的值被指定为用于接收表单数据的URL，如果忽略这个值，表单会提交到它被加载进来时的同一URL
- 服务器通过input域中的name属性识别字段
- 表单被提交(通过浏览器或Ajax)时，必须被编码(enctype)。默认为'application/x-wwwform-urlencoded'。如果上传文件，使用编码'multipart/form-data'，还可以使用accept属性限制上传文件的类型
- 如果不使用Ajax,唯一选择就是使用浏览器提交表单，这样会重新加载页面
- 推荐使用303重定向来响应表单提交。303重定向后，无论之前表单提交是什么方法，都应该使用GET请求


#### 中间件
中间件是一种功能的封装方式，是一个有3个参数的函数：一个请求对象，一个响应对象，一个next函数。

中间件是在管道中执行的，这个比喻强调了中间件的执行顺序问题，把一个中间件在别的中间件前后执行的效果是不同的。在Express程序中，通过调用app.use向管道中插入中间件。

在管道的最后放一个“捕获一切”请求的处理器是常见的作法，由它来处理跟前面其它所有路由都不匹配的请求。

请求在管道中如何终止？这个是由传给每个中间件的next函数来实现的，如果不调用next()，请求就在那个中间件中终止了。

- 路由处理器(app.get, app.post等，经常被统称为app.VERB)可用被看作只处理特定HTTP谓词(GET,POST等)的中间件
- 路由处理器的第一个参数必须是路径。使用'/*'可以让某个路由匹配所有路径。中间件也可以将路径作为第一个参数，但它是可选的，如果忽略这个参数，它会匹配所有路径。
- 路由处理器和中间件的参数中都有回调函数，参数可以是2个或3个，例如(req, res, next)，也可以是4个参数，就是错误处理中间件，例如(err, req, res, next)
- 如果不调用next()，管道就会被终止，也不会再由处理器或中间件做后续处理。这时应该给客户端一个响应，否则客户端会被挂起直到超时。
- 如果调用了next()，一般不宜再发送响应到客户端。

#### 路由
路由是将请求(由URL和HTTP方法指定)转发到处理它们的代码去的一种机制。


#### REST
REST表示“表述性状态传输”(Representational State Transfer)，“REST 风格”形容满足REST原则的web服务。

REST基本上就是客户端和服务器的无状态链接，服务可以被缓存，可以被分层。

#### 调试
Node内置的调试器，允许你逐步执行程序
```javascript
node debug meadowlark.js
```

#### 托管服务
域名系统(DNS)负责将域名映射到IP地址。

顶级域名：域名的结尾部分(比如.net或者.com)叫做顶级域名(TLD)。
- 国家代码TLD。比如 .us, .es, .uk
- 统一TLD。比如 .com, .net, .gov, .fed, .mil等

子域名：TLD在子域名后面，子域名在域名前面。最常见的子域名是www

