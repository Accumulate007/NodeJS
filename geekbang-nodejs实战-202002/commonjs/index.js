// index.js

/**
 * 通过 require 方式被引入的模块模块内部代码会被执行
 * console.log('start require...')
 * require('./lib.js') // 引入依赖并执行
 * console.log('end require...')
 */

let lib = require('./lib.js')

// 同一个引用，可以改变 lib
lib.newAdd = 'add in index.js'


// game
let playerAction = process.argv[process.argv.length - 1]
const game = require('./game.js')

let count = 0
// 开启进程，保留进程的标准输入(stdin)
process.stdin.on('data', e => {
    const playerAction = e.toString().trim()
    console.log(playerAction)

    let result = game(playerAction)

    if(result === -1) {
        count++
    }

    // 如果电脑连输3次
    if(count === 3) {
        process.exit()  // 退出进程
    }
})

