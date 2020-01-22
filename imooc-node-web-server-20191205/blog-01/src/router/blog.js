
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 统一的登录验证函数
const loginCheck = (req) => {
    if(!req.session.username) {
        return Promise.resolve(
            new ErrorModel('Please Login!!!')
        )
    }
}





const handleBlogRouter = (req, res) => {
    const method = req.method

    // 获取博客列表
    if(method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''

        // const listData = getList(author, keyword)
        // return new SuccessModel(listData)

        const result = getList(author, keyword)
        result.then(listData => {
            return new SuccessModel(listData)
        })
    }

    // 获取博客详情
    if(method === 'GET' && req.path === '/api/blog/detail') {
        // const id = req.query.id
        // const detailData = getDetail(id)

        const result = getDetail(id)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    // 新建博客
    if(method === 'POST' && req.path === '/api/blog/new') {
        // const blogData = req.body
        // const data = newBlog(blogData)
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult) {
            // 未登录
            return loginCheckResult
        }

        req.body.author = req.session.username
        const result = newBlog(req.body)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    // 更新博客
    if(method === 'POST' && req.path === '/api/blog/update') {
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult) {
            // 未登录
            return loginCheckResult
        }

        const result = updateBlog(id, req.body)
        return result.then(val => {
            if(val) {
                return new SuccessModel()
            } else {
                return new ErrorModel('Update Blog Faild')
            }
        })
    }

    // 删除博客
    if(method === 'POST' && path === '/api/blog/del') {
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult) {
            // 未登录
            return loginCheckResult
        }

        const author = req.session.username
        const result = delBlog(id, author)
        return result.then(val => {
            if(val) {
                return new SuccessModel()
            } else {
                return new ErrorModel('Update Blog Faild')
            }
        })
    }
}





module.exports = handleBlogRouter

