/**
 * mysql.js
 */
const mysql = require('mysql')
const { MYSQL_CONF } = require('../config/db')


// 创建连接对象
const con = mysql.createConnection(MYSQL_CONF)


// 开始连接
con.connect()

// 统一 SQL 语句的函数
function exec(sql) {
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if(err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })

    return promise
}

// 关闭连接
con.end()

module.exports = {
    exec
}
