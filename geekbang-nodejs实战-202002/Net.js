/**
 * Net
 */

const net = require('net')

const server = net.createServer((scoket) => {
    scoket.on('data', function(buffer) {

    })
})



server.listen(4000)

