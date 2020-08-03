
const { ErrorModel } = require('../model/ResModel')
const { loginCheckFailInfo } = require('../model/ErrorInfo')

/**
 * api登录验证
 */
async function loginCheck(ctx, next){
    if(ctx.session && ctx.session.userInfo){
        await next()
        return
    }
    ctx.body = new ErrorModel(loginCheckFailInfo)
}

/**
 * 页面登录验证
 */
async function loginRedirect(ctx, next){
    if(ctx.session && ctx.session.userInfo){
        await next()
        return;
    }
    const curUrl = ctx.url;
    ctx.redirect('/login?url=' + encodeURIComponent(curUrl))
}



module.exports = {
    loginCheck,
    loginRedirect
}

