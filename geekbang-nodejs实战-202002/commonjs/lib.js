// lib.js

console.log('this is lib.js')


exports.hello = 'hello from lis.js'

exports.foo = function(a, b) {
    return a + b
}

exports.nameObj = {
    name: 'jack'
}

/*
// 会重写exports对象，导致上面的赋值无效
module.exports = function() {
    console.log('fn from lib moudle.exports')
}
*/

















