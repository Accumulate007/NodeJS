const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = rquire('cookie-parser')

// 设置cookie密钥
const cookieSecret = '#secret#for#cookie'


// 设置视图引擎
const handlebars = require('express3-handlebars').create({defaultLayout: 'main'})

const app = express()

// 配置Exrepss，将 handlebars作为默认的视图引擎
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')    // 设置默认的模板引擎
app.set('views', './views/layouts')     // 指定模板文件路径

app.set('port', process.env.PORT || 3000)

// static中间件应该加在所有路由之前
app.use(express.static(__dirname + '/public'))

app.use(bodyParser())

app.use(cookieParser(cookieSecret))

app.get('/', function(req, res) {
    res.render('home')
})


app.get('/about', function(req, res) {
    res.render('about')
})

// 处理表单提交 '/process'为前端表单中action提交的路径
app.post('/process', function(req, res) {
    // console.log(req.query)  // 用于处理get方式的表单请求字段

    // post方式请求的表单，需要借助body-parser中间件解析URL编码体，引入body-parser后，req.body变为可用
    console.log('From (from querystring): ' + req.query.form)
    console.log('CSRF token (from hidden form field): ' + req.body._csrf)
    console.log('Color (from visible form field): ' + req.body.color)

    // res.redirect(303, '/thank-you')     // 建议303重定向
})

// 处理ajax方式表单提交
app.post('/ajax-form', function(req, res) {
    if(req.xhr || req.accepts('json,html') === 'json') {
        res.send({
            success: true
        })
    } else {
        // 如果发送错误，重定向到错误页面
        res.redirect(303, '/thank-you')
    }
})

/**
 * 在Express中，添加路由和中间件的顺序非常重要，如果把定制 404 的中间件放在所有路由上面，
 * 那 / 和 /about页面就无法调用，访问这些URL得到的都是404
 */
// 定制 404页面
app.use(function(req, res) {
    /*
    res.type('text/plain')  // 设置相应头 Content-Type
    res.status(404)
    res.send('404-Not Found')
    */
   res.status(404)
   res.render('404')
})

// 定制 500页面
app.use(function(err, req, res, next) {
    // res.type('text/plain')
    res.status(500)
    res.render('500')
})


app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + 
    app.get('port') + '; press Ctrcl-C to terminate.')
})


/**
 * app.get(path, callback)
 * path默认忽略了大小写或反斜杠，并且在进行匹配时也不考虑查询字符串，所以，对于路径：
 * /about, /About, /about/, /about?foo=bar 等路径都适用
 * 
 * path路由匹配上之后，就会调用你提供的callback函数，并且把请求和响应对象作为参数传递给这个函数
 * 
 * 
 */
