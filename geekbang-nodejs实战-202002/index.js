const koa = require('koa')
const fs = require('fs')
const mount = require('koa-mount')  // 路由中间件
const static = require('static')
const rpcClient = rquire('./client')
const template = require('./template')

const app = new koa()

const detailTemplate = template(__dirname + '/template/index.html')

app.use(
    async (ctx) => {
        const result = await new Promise((resolve, reject) => {
            rpcClient.write({
                columnid: ctx.query.columnid
            }, function(err, data) {
                err ? reject(err) : resolve(data)
            })
        })

        ctx.status = 200
        ctx.body = detailTemplate(result)
    }
)



app.listen(3000)
