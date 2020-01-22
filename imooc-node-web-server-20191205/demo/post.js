/**
 * post请求处理
 * 
 * 
 */

const http = require('http')

const server = http.createServer((req, res) => {
    if(req.method === 'POST') {
        let postData = ''

        req.on('data', chunk => {
            postData += chunk.toString()
        })

        req.on('end', () => {
            res.end(postData)
        })
    }
})





