/**
 * 微博view路由
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getHomeBlogList } = require('../../controller/blog-home')



router.get('/', loginRedirect, async(ctx, next) => {
    const userInfo = ctx.session.userInfo
    const { id: userId } = userInfo

    // 获取第一页数据
    const result = await getHomeBlogList(userId) 
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data   



    let fansCount = 1, fansList = [], followersCount=5, followersList=[], atCount= 0;

    await ctx.render('index', {
        userData: {
            userInfo,
            fansData: {
                count: fansCount,
                list: fansList
            },
            followersData: {
                count: followersCount,
                list: followersList
            },
            atCount
        },
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })
})

module.exports = router