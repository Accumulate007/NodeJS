
module.exports = function(playerAction) {
    let computerAction = 'rock'
    let random = Math.random() * 3

    if(random < 1) {
        computerAction = 'rock'     // 石头
    } else if(random > 2) {
        computerAction = 'scissor'     // 剪刀
    } else {
        computerAction = 'paper'     // 布
    }

    if(computerAction === playerAction) {
        console.log('平局')
        return 0
    } else if(
        (computerAction === 'rock' && playerAction === 'paper') ||
        (computerAction === 'scissor' && playerAction === 'rock') ||
        (computerAction === 'paper' && playerAction === 'scissor')
    ) {
        console.log('You are win!')
        return -1
    } else {
        console.log('You are lose...')
        return 1
    }
}