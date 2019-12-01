/**
 * fs
 * 用于操作系统中的文件或者文件夹
 * 
 * 
 */

const fs = require('fs')

fs.open('./demo-01.js', 'r', function(err, fd) {
    console.log(fd) // 3
})


/**
 * fs.read
 * 读取文件
 * 
 * 
 */

fs.open('./demo-02.js', 'r', function(err, fd) {
    if(err) {
        console.log(err)
    } else {
        let bf1 = new Buffer(10)
        fs.read(fd, bf1, 0, 4, function(err, newBf) {
            console.log(bf1)
        })
    }
})



/**
 * fs.write
 * 写文件
 * 
 */

fs.open('./demo-03.js', 'r', function(err, fd) {
    if(err) {
        console.log(err)
    } else {
        let bf1 = new Buffer(10)
        fs.write(fd, bf1, 0, 4, 5, function(err, newBf) {
            console.log(bf1)
        })
    }
})


/**
 * fs.appendFile()
 * 向文件中追加新的内容
 * 
 */

 fs.appendFile('./demo-04.js', 'new words from demo-05', function(err) {
     console.log(arguments)
 })


/**
 * fs.watch
 * 
 */

fs.watch('./demo-01.js', function(type, fn) {
    console.log(type)
})


/**
 * fs.mkdir()   // 创建文件夹
 * 
 * fs.rmdir()   // 删除文件夹
 * 
 * fs.readdir() // 读取文件夹
 * 
 */

fs.mkdir('./mkdir.js', function() {

})









