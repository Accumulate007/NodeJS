const fs = require('fs')
const path = require('path')


// __dirname 当前文件的目录
const fileName = path.resolve(__dirname, 'data.txt')

// 读取文件内容
fs.readFile(fileName, (err, data) => {
    if(err) {
        console.error(err)
        return
    }

    // data 是二进制类型数据，需要转化成字符串
    console.log(data.toString())
})


// 写入文件
const content = '这是新写入的内容\n'
const opt = {
    flag: 'a'   // 追加写入内容：a, 覆盖之前的内容写入：w
}

fs.writeFile(fileName, content, opt, (err) => {
    if(err) {
        console.error(err)
    }
})


// 判断文件是否存在
fs.exists(fileName, (exist) => {
    console.log(exist)
})

/**
 * IO操作的性能瓶颈
 * - 网络IO
 * - 文件IO
 * 
 */




