/**
 * API 路由
 */
const router = require('koa-router')()

const {
    login,
    register,
    isExist,
    deleteCurUser
} = require('../../controller/user')
const userValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')
const { loginCheck } = require('../../middlewares/loginChecks')
const { isTest } = require('../../utils/env')

router.prefix('/api/user')

// 登录
router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body;
    ctx.body = await login(ctx, userName, password)
})


// 注册
router.post('/register', genValidator(userValidate), async(ctx, next) => {
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


router.post('/delete', loginCheck, async (ctx, next) => {
    if(isTest){
        const { userName } = ctx.session.userInfo;
        console.log('--------------------------------------');
        console.log(ctx.session.userInfo);
        ctx.body = await deleteCurUser(userName)
    }
})

module.exports = router
