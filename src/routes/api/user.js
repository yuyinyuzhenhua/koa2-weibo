/**
 * API 路由
 */
const router = require('koa-router')()

const {
    login
} = require('../../controller/user')

router.prefix('/api/user')

// 登录
router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body;
    ctx.body = await login(ctx, userName, password)
})

module.exports = router

