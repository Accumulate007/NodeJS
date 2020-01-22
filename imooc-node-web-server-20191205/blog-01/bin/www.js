
const http = require('http')


const PORT = 8585
const serverHandle = require('../app')



const server = http.createServer(serverHandle)

server.listen(PORT)
console.log('now is listening at prot 8585...')

