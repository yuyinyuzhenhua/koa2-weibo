const {
    getUserInfo,
    createUser,
    deleteUser,
    updateUser,
} = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
    loginFailInfo,
    registerUserNameExistInfo,
    registerFailInfo,
    registerUserNameNotExistInfo,
    deleteUserFailInfo,
    changeInfoFailInfo,
    changePasswordFailInfo
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


/**
 * 修改个人信息
 * @param {Object} ctx ctx
 * @param {string} nickName 昵称
 * @param {string} city 城市
 * @param {string} picture 头像
 */
async function changeInfo(ctx, { nickName, city, picture }){
    const { userName } = ctx.session.userInfo
    if (!nickName) {
        nickName = userName
    }    
    const result = await updateUser(
        {
            newNickName: nickName,
            newCity: city,
            newPicture: picture
        },
        { userName }
    )
    if(result) {
        Object.assign(ctx.session.userInfo, {
            nickName,
            city,
            picture
        })
        return new SuccessModel()
    }
    return new ErrorModel(changeInfoFailInfo)
}


/**
 * 修改密码
 * @param {string} userName 用户名
 * @param {string} password 当前密码
 * @param {string} newPassword 新密码
 */
async function changePassword(userName, password, newPassword){
    const result = await updateUser(
        {
            newPassword: doCrypto(newPassword)
        },
        {
            userName,
            password: doCrypto(password)
        }
    )
    if (result) {
        // 成功
        return new SuccessModel()
    }
    // 失败
    return new ErrorModel(changePasswordFailInfo)    
}


/**
 * 退出登录
 * @param {Object} ctx ctx
 */
async function logout(ctx){
    delete ctx.session.userInfo
    return new SuccessModel()

}



module.exports = {
    login,
    register,
    isExist,
    deleteCurUser,
    changeInfo,
    changePassword,
    logout
}