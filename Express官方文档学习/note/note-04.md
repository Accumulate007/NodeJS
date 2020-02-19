#### 模板引擎
需要在应用中进行如下设置才能让 Express 渲染模板文件
```javascript
// 模板文件的路径
app.set('views', './my-views')

// 使用哪种模板引擎
app.set('view engine', 'jade')


// 使用模板引擎
app.get('/', function(req, res) {
    // 渲染 my-views 目录下的 index.jade 模板
    res.render('index', {
        title: 'This is title',
        message: 'Hello Jade'
    })
})
```


#### 调试Express
设置DEBUG环境变量为express:*，可以查看Express中用到的所有内部日志。
```javascript
$ DEBUG=express:* node index.js
```

设置DEBUG的值为express:router，只查看路由部分的日志
```javascript
$ DEBUG=express:router node index.js
```

