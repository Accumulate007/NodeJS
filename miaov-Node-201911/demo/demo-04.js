/**
 *Buffer 
 * 用于操作二进制数据，我们在操作文件或者网络数据的时候，其实操作的就是二进制流
 * 
 * 
 */

 // 为一个buffer对象分配空间大小后，其长度是固定的，不能改变
let b1 = new Buffer(5)  
console.log(b1)

// 申明并赋值
let b2 = new Buffer([1,2,3])
console.log(b2)


let b3 = new Buffer('chen', 'utf-8')
console.log(b3)

// buf.write(要写入的字符串， 从buf对象中的第几位开始写入， 写入的字符串的长度， 写入字符串的编码)
let str1 = 'chen'
let buf1 = new Buffer(5)

buf1.write(str1)


// buf.toString()
let buf2 = new Buffer('china')

console.log( buf2.toString() )  // china


// 返回Buffer是否支持该编码
Buffer.isEncoding('utf-8')

// 判断一个对象是否是Buffer实例
Buffer.isBuffer(buf2)
