/**
 * API 路由
 */
const router = require('koa-router')()

const {
    login,
    register,
    isExist,
    deleteCurUser,
    changeInfo,
    changePassword,
    logout
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

// 测试环境下，测试账号登录之后，删除自己
router.post('/delete', loginCheck, async (ctx, next) => {
    if(isTest){
        const { userName } = ctx.session.userInfo;
        console.log('--------------------------------------');
        console.log(ctx.session.userInfo);
        ctx.body = await deleteCurUser(userName)
    }
})

// 修改个人信息
router.patch('/changeInfo', loginCheck, genValidator(userValidate), async (ctx, next) => {
    const { nickName, city, picture } = ctx.request.body
    ctx.body = await changeInfo(ctx, { nickName, city, picture })
})

// 修改密码
router.patch('/changePassword', loginCheck, genValidator(userValidate), async (ctx, next) => {
    const { password, newPassword } = ctx.request.body
    const { userName } = ctx.session.userInfo
    ctx.body = await changePassword(userName, password, newPassword)
})

// 退出登录
router.post('/logout', loginCheck, async (ctx, next) => {
    ctx.body = await logout(ctx)
})



module.exports = router
