/**
 * 客户端RPC通道请求
 * 
 * 
 */


const EasySock = require('easy_sock')
const protobuf = require('protocol-buffers')
const fs = require('fs')

const schemas = protobuf(fs.readFileSync(`${__dirname}/detail-service/proto/detail.proto`))

const easySock = new EasySock({
    ip:'127.0.0.1',
    port: 4000,
    timeout: 500,
    keepAlive: true
})

// 编码
easySock.encode = function(data, seq) {
    const body = schemas.ColumnRequest.encode(data)
    const head = Buffer.alloc(8)
    head.writeInt32BE(seq)
    head.writeInt32BE(body)

    return Buffer.concat([head, body])
}

// 解码
easySock.decode = function(buffer) {
    const seq = buffer.readInt32BE()
    const body = schemas.ColumnResponse.decode(buffer.slice(0))
    return {
        result: body,
        seq
    }
}


easySock.isReceiveComplete = function(buffer) {
    if(buffer.length < 8) {
        return 0
    }

    const bodyLength  = buffer.readInt32BE()
    if(bodyLength >= bodyLength + 8) {
        return bodyLength + 8
    } else {
        return 0
    }
}


module.exports = easySock



