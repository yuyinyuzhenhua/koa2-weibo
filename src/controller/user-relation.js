/**
 * @description 用户关系 controller
 */

 const {
    getUsersByFollower,
    getFollowersByUser,
    addFollower,
    deleteFollower
 } = require('../services/user-relation')
 const { SuccessModel, ErrorModel } = require('../model/ResModel')
 const { addFollowerFailInfo, deleteFollowerFailInfo } = require('../model/ErrorInfo')


/**
 * 
 * @param {*} userId 
 */
async function getFans(userId) {
    const { count, userList } = await getUsersByFollower(userId)
    return new SuccessModel({
        count,
        fansList: userList
    })
}


/**
 * 获取关注人列表
 */
 async function getFollowers(userId) {
     const { count, userList } = await getFollowersByUser(userId)
     return new SuccessModel({
         count,
         followersList: userList
     })
 }

 module.exports = {
    getFollowers,
    getFans
 }

