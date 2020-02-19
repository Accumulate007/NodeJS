### 中间件
Express是一个自身功能极简，完全是由路由和中间件构成一个的web开发框架：从本质上来说，一个Express应用就是在调用各种中间件

中间件是一个函数，可以访问请求对象(reqest object)，响应对象(response object)，以及一个next变量。

中间件的功能包括
- 执行任何代码
- 修改请求和响应对象
- 终结请求-响应循环
- 调用堆栈中的下一个中间件(next())

如果当前中间件没有终结请求-响应循环，则必须调用next()方法将控制权交给下一个中间件，否则请求就会挂起。

Express中的中间件大致可以分为
- 应用级中间件
- 路由级中间件
- 错误处理中间件
- 内置中间件
- 第三方中间件


#### 应用级中间件
应用级中间件绑定到app对象使用app.use()和app.METHOD()。例如
```javascript
const app = express()
app.use(function(req, res, next) {
    console.log('hello')
    next()
})


app.get('/', function(req, res) {
    res.send('user')
})
```

**next('route')**

调用next('route')方法将控制权交给下一个路由，next('route')只对使用app.VERB()或router.VERB()加载的中间件有效。
```javascript
app.get('/user/:id', function(req, res) {
    if(req.params.id === 'chen') {
        // 跳到下一个路由
        next('route')
    } else {
        res.render('commonIndex')
    }
})

// 渲染 id === 'chen' 的特殊页面
app.get('/user/:id', function(req, res) {
    res.render('chenIndex')
})
```

#### 路由级中间件
路由级中间件和应用级中间件一样，只是它绑定的对象为express.Router()。
```javascript
const app = express()
const router = express.Router()

// 没有挂载路径的中间件，通过该路由的每个请求都会执行该中间件
router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// 一个中间件栈，处理指向 /user/:id 的 GET 请求
router.get('/user/:id', function (req, res, next) {
  // 如果 user id 为 0, 跳到下一个路由
  if (req.params.id == 0) next('route');
  // 负责将控制权交给栈中下一个中间件
  else next(); //
}, function (req, res, next) {
  // 渲染常规页面
  res.render('regular');
});

// 将路由挂载至应用
app.use('/', router);
```


#### 错误处理中间件
在其他app.use()和路由调用后，最后定义错误处理中间件。
```javascript
// 错误处理中间件中next即便不使用，也必须定义
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```


#### 内置中间件
从4.x版本开始，Express已经不再依赖Connect了，express.static是Express唯一内置的中间件。

express.static(path, options)
- 参数path指提供静态资源的根目录
- options是一个可选的参数，是一个对象，可以设置各种参数


#### 第三方中间件
第三方中间件使用举例
```javascript
const cookieParser = require('cookie-parse')

app.use(cookieParser())
```

