/**
 * controller -> blog.js
 */
const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
    if(author) {
        sql += `and author='${author}' `
    }

    if(keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    return exec(sql)
}

const getDetail = (id) => {
    let sql = `select * from blogs where id=${id}`;
    return exec(sql).then(rows => {
        return rows[0]
    })
}

const newBlog = (blogData = {}) => {
   const { title, content, author } = blogData
   const createTime = Date.now()

   let sql = `insert into blogs (title, content, createtime, author)
              values ('${title}', '${content}', '${createTime}', '${author}');`

    return exec(sql).then(insertData => {

    })
}

const updateBlog = (id, blogData = {}) => {
    const { title, content } = blogData
    let sql = `
        update blogs set title='${title}',content='${content}' where id=${id};
    `

    return exec(sql).then(updateData => {
        return updateData.affectedRows > 0
    })
}

const delBlog = (id, author) => {
    let sql = `delete from blogs where id='${id}' and author='${author}';`
    return exec(sql).then(delData => {
        return delData.affectedRows > 0
    })
}



module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}

