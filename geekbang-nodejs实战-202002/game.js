console.log(__filename) // 当前运行脚本所在的位置 F:\geekbang-nodejs实战-202002\index.js
console.log(__dirname)  // 当前运行脚本所在的目录 F:\geekbang-nodejs实战-202002

// console.log(process)    // 进程对象，包含了进程的信息

// game
let playerAction = process.argv[process.argv.length - 1]    // 用户的输入会存在process对象的argv数组里
console.log(playerAction)

let random = Math.random() * 3

let computerAction = 'rock'
if(random < 1) {
    computerAction = 'rock'     // 石头
} else if(random > 2) {
    computerAction = 'scissor'     // 剪刀
} else {
    computerAction = 'paper'     // 布
}

if(computerAction === playerAction) {
    console.log('平局')
} else if(
    (computerAction === 'rock' && playerAction === 'paper') ||
    (computerAction === 'scissor' && playerAction === 'rock') ||
    (computerAction === 'paper' && playerAction === 'scissor')
) {
    console.log('You are win!')
} else {
    console.log('You are lose...')
}
