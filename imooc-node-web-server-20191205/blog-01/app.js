
const querystring = require('querystring')

const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const { access } = require('./src/utils/log')

// 获取cookie过期时间
const getCookieExpires = function() {
    const d = new Date.now()
    d.setTime(d.getTime() + (24*60*60*1000))
    return d.toGMTString()
}

// session数据
let SESSION_DATA = {}



// 用于处理 post data
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if(req.method !== 'POST' || req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        } 

        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if(!postData) {
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
        })
    })

    return promise
}

const serverHandle = (req, res) => {
    // 记录 access log
    access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)

    res.setHeader('Content-type', 'application/json')

    // 获取path
    const url = req.url
    req.path = url.split('?')[0]

    // 解析 query
    req.query = querystring.parse(url.split('?')[1])

    // 解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if(!item) return
        const arr = item.split('=')
        const key = arr[0].trim()
        const value = arr[1].trim()
        req.cookie[key] = value
    })

    // 解析session
    let needSetCookie = false
    const userId = req.cookie.userid
    if(userId) {
        if(SESSION_DATA[userId]) {
            SESSION_DATA[userId] = {}
        } 
    } else {
        needSetCookie = true
        userId = new Date.now()
        SESSION_DATA[userId] = {}
    }
    req.session = SESSION_DATA[userId]

    // 处理 psot data
    getPostData().then(postData => {
        req.body = postData

        // 处理blog路由
        // const blogData = handleBlogRouter(req, res)
        const blogResult = handleBlogRouter(req, res)

        if(blogResult) {
            blogResult.then(blogData => {
                if(needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(JSON.stringify(blogData))
            })
            return
        }


        // 处理user路由
        const userResult = handleUserRouter(req, req)
        if(userResult) {
            userResult.then(userData => {
                if(needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(
                    JSON.stringify(userData)
                )
            })
            return
        }

        // 未命中路由，返回404
        res.writeHead(404, {
            'Content-type': 'text/plain'
        })
        res.write("404, Not Found\n")
        res.end()
    })

}




module.export = serverHandle
