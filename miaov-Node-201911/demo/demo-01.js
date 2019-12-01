
// 文件解析后的绝对路径
let f = __filename
console.log(f)  // F:\Node-1125\demo\demo-01.js


/**
 * 模块加载系统
 * 
 * require('模块路径')  // 可以是相对路径和绝对路径
 */


 /**
  * 模块加载机制
  * 
  * 1.首先按照要加载的模块的文件名称进行查找
  * 2.如果没有找到，则会在模块文件名后加上 .js 的后缀进行查找
  * 3.如果还没有找到，则会在文件名称后加上 .json 的后缀进行查找
  * 4.如果还没有找到，最会在文件名称后加上 .node 的后缀进行查找
  * 
  * 
  */



/**
 * 在一个模块中通过var定义的变量，其作用域是当前模块，外部不能够直接使用
 * 
 * 如果想模块内部的变量外部也可以使用，可以：
 * 1.全局加载方式，将变量挂载到global上。例如 global.a = 'a'
 * 2.使用模块对象 module(保存和提供了当前模块有关的一些信息)
 * 
 * 我们可以通过 module.exports 对象把一个模块中的局部变量对象进行提供访问
 * 
 */

console.log(module)
/**
 *
 *  {
        id: '.',
        exports: {},
        parent: null,   // 该模块被引用的父级模块
        filename: 'F:\\Node-1125\\demo\\demo-01.js',    // 模块的绝对路径
        loaded: false,
        children: [],   // 模块引入的子模块
        paths: [ 'F:\\Node-1125\\demo\\node_modules',
            'F:\\Node-1125\\node_modules',
            'F:\\node_modules' ] 
    }
 */


// let a1 = require('./a.js')    这个方法的返回值 a1 其实就是被加载模块 a.js 的 module.exports对象

console.log(exports)
console.log( module.exports === exports )   // true

