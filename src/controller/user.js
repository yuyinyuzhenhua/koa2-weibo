const {
    getUserInfo,
} = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
    loginFailInfo
} = require('../model/ErrorInfo')



/**
 * 登录
 */
async function login(ctx, userName, password) {
    const userInfo = await getUserInfo(userName, password)
    if (!userInfo) {
        // 登录失败
        return new ErrorModel(loginFailInfo)
    }

    
    // 登录成功
    if (ctx.session.userInfo == null) {
        ctx.session.userInfo = userInfo
    }
    return new SuccessModel()

}


module.exports = {
    login
}