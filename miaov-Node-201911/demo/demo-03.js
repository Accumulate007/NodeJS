/**
 * process
 * 是一个全局对象，通过该对象提供的属性和方法，可以对当前运行的程序的进程进行访问和控制
 * 
 * 
 */

console.log(process)
console.log(global.process)

// 用户环境信息: process.env
console.log(process.env)

// 退出当前程序  process.exit()

/**
 * 标准输入输出流(IO)
 * 
 * stdin    标准输入流
 * stdout   标准输出流
 * 
 */

process.stdout.write('Like console.log')

// 默认情况下，输入流是关闭的，要监听输入流数据，首先要开启
process.stdin.resume()

// 监听用户的输入
process.stdin.on('data', function(chunk) {

})



