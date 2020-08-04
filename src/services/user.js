/**
 * @description user service
 */

const { User } = require('../db/model/index')
const { formatUser } = require('./_format')
// const { addFollower } = require('./user-relation')


async function getUserInfo(userName, password){
    // 查询条件
    const whereOpt = {
        userName
    }
    if(password){
        Object.assign(whereOpt, {password})
    }
    const result = await User.findOne({
        attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
        where: whereOpt
    })
    if(result === null){
        return result
    }
    // 格式化
    const formatRes = formatUser(result.dataValues)

    return formatRes
}


/**
 * 
 */

 async function createUser({ userName, password, gender=3, nickName }){
     const result = await User.create({
        userName,
        password,
        nickName: nickName ? nickName : userName,
        gender
     })
     const data = result.dataValues
     return data
 }

 /**
  * 删除用户
  */

async function deleteUser(userName) {
    const result = await User.destroy({
        where: {
            userName
        }
    })
    return result > 0
}

module.exports={
    getUserInfo,
    createUser,
    deleteUser    
}