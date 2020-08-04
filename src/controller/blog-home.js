/**
 * @description 首页 controller
 */

const { createBlog, getFollowersBlogList } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { PAGE_SIZE, REG_FOR_AT_WHO } = require('../conf/constant')
const { getUserInfo } = require('../services/user')

/**
 * 创建微博
 * @param {Object} param0 创建微博所需的数据 { userId, content, image }
 */
async function create({ userId, content, image }){
    // 创建微博
    const blog = await createBlog({
        userId,
        content: content,
        image
    })
    if(blog){
        return new SuccessModel(blog)
    }
    
    return new ErrorModel(createBlogFailInfo)
}

module.exports= {
    create
}
