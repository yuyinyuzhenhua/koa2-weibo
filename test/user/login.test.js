/**
 * user api test
 */
const server = require('../server')
const { notDev } = require('../../src/utils/env')

// 用户信息
const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`
const testUser = {
    userName,
    password,
    nickName: userName,
    gender: 1
}

// 存储 cookie
let COOKIE = ''


test('注册一个用户，应该成功', async () => {
    const res = await server
                .post('/api/user/register')
                .send(testUser)
    expect(res.body.errno).toBe(0) 
})

// 重复注册
test('重复注册用户，应该失败', async () => {
    const res = await server
            .post('/api/user/register')
            .send(testUser)
    expect(res.body.errno).not.toBe(0)
})

// 查询用户是否存在
test('查询注册的用户名，应该存在', async () => {
    const res = await server
                .post('/api/user/isExist')
                .send({ userName })
    expect(res.body.errno).toBe(0)
})

// json schema 检测
test('json schema 检测，非法的格式，注册应该失败', async () => {
    const res = await server
            .post('/api/user/register')
            .send({
                userName: '123',
                password: 'a',
                gender: 'all'
            })
    expect(res.body.errno).not.toBe(0)
})

// 登录
test('登录，应该成功', async () => {
    const res = await server
        .post('/api/user/login')
        .send({
            userName,
            password
        })
    expect(res.body.errno).toBe(0)
    COOKIE = res.headers['set-cookie'].join(';')
})


// 删除  测试环境下创建的用户删除掉
test('删除用户，应该成功', async () => {
    const res = await server
        .post('/api/user/delete')
        .set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
})


test('删除之后，再次查询注册的用户名，应该不存在', async () => {
    const res = await server
        .post('/api/user/isExist')
        .send({ userName })
    expect(res.body.errno).not.toBe(0)
})