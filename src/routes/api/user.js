/**
 * API 路由
 */
const router = require('koa-router')()

const {
    login,
    register,
    isExist
} = require('../../controller/user')

router.prefix('/api/user')

// 登录
router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body;
    ctx.body = await login(ctx, userName, password)
})


// 注册
router.post('/register', async(ctx, next) => {
    const { userName, password, gender } = ctx.request.body;
    ctx.body = await register({
        userName,
        password,
        gender
    })
})

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body;
    ctx.body = await isExist(userName);
})



module.exports = router
