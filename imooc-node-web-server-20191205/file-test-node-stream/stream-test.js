
// 标准输入输出
process.stdin.pipe(process.stdout)



// 复制文件
const fs = require('fs')
const path = require('path')

const fileName01 = path.resolve(__dirname, 'stream-data01.txt')
const fileName02 = path.resolve(__dirname, 'stream-data02.txt')

const readStream = fs.createReadStream(fileName01)
const writeStream = fs.createWriteStream(fileName02)

readStream.pipe(writeStream)
readStream.on('end', () => {
    console.log('copy is done!')
})


