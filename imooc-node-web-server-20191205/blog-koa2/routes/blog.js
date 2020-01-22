const router = require('koa-router')()

router.prefix('/users')

router.get('/list', async function (ctx, next) {
    const query = ctx.query
    ctx.body = {
        errno: 0,
        data: ['get blog list']
    }
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router