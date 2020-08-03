/**
 * 微博view路由
 */

const router = require('koa-router')()

router.get('/', async(ctx, next) => {
    const userInfo = ctx.session.userInfo
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
            isEmpty: true,
            blogList:[],
            pageSize: 10,
            pageIndex:1,
            count:2
        }
    })
})

module.exports = router