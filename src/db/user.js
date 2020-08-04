const {
    getUserInfo,
    createUser,
    deleteUser,
} = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
    loginFailInfo,
    registerUserNameExistInfo,
    registerFailInfo,
    registerUserNameNotExistInfo,
    deleteUserFailInfo
} = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')



/**
 * 登录
 */
async function login(ctx, userName, password) {
    const userInfo = await getUserInfo(userName, doCrypto(password))
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


// 注册
async function register({ userName, password, gender }){
    const userInfo = await getUserInfo(userName)
    if(userInfo){
        return new ErrorModel(registerUserNameExistInfo)
    }

    try{
        await createUser({
            userName,
            password: doCrypto(password),
            gender
        })
        return new SuccessModel()
    } catch (ex) {
        console.error(ex.message, ex.stack);
        return new ErrorModel(registerFailInfo)
    }

}

// 用户名是否存在
async function isExist(userName){
    const userInfo = await getUserInfo(userName)
    if(userInfo){
        return new SuccessModel(userInfo)
    } else {
        return new ErrorModel(registerUserNameNotExistInfo)
    }
}


async function deleteCurUser(userName){
    const result = await deleteUser(userName)
    if(result){
        return new SuccessModel()
    }
    return new ErrorModel(deleteUserFailInfo)
}

module.exports = {
    login,
    register,
    isExist,
    deleteCurUser
}