/**
 * @description user api test
 * @author vortesnail
 */

const server = require('../server')

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

// 注册
it('注册用户，应该成功', async () => {
  const res = await server
    .post('/api/user/register')
    .send(testUser)
  expect(res.body.errno).toBe(0)
})

// 重复注册
it('重复注册用户，应该失败', async () => {
  const res = await server
    .post('/api/user/register')
    .send(testUser)
  expect(res.body.errno).not.toBe(0)
})

// 查询用户是否存在
it('查询注册的用户名，应该存在', async () => {
  const res = await server
    .post('/api/user/isExist')
    .send({ userName })
  expect(res.body.errno).toBe(0)
})

// json schema 检测
it('json schema 检测，非法的格式，注册应该失败', async () => {
  const res = await server
    .post('/api/user/register')
    .send({
      userName: '123', // 用户名不是字母（或下划线）开头
      password: 'a', // 最小长度不是 3
      gender: 'male', // 不是数字
    })
  expect(res.body.errno).not.toBe(0)
})

// 登录
it('登录，应该成功', async () => {
  const res = await server
    .post('/api/user/login')
    .send({ userName, password })
  expect(res.body.errno).toBe(0)

  // 获取 cookie
  COOKIE = res.headers['set-cookie'].join(';')
})

// 修改基本信息
it('修改基本信息，应该成功', async () => {
  const res = await server
    .patch('/api/user/changeInfo')
    .send({
      nickName: '测试昵称',
      city: '测试城市',
      avatar: '/test.png'
    })
    .set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
})

// 修改密码
it('修改密码，应该成功', async () => {
  const res = await server
    .patch('/api/user/changePassword')
    .send({
      password,
      newPassword: `u_${Date.now()}`
    })
    .set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
})

// 删除
it('删除用户，应该成功', async () => {
  const res = await server
    .post('/api/user/delete')
    .set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
})

// 退出
it('退出登录，应该成功', async () => {
  const res = await server
    .post('/api/user/logout')
    .set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
})

// 再次查询用户，应该不存在
it('删除之后，再次查询注册的用户名，应该不存在', async () => {
  const res = await server
    .post('/api/user/isExist')
    .send({ userName })
  expect(res.body.errno).not.toBe(0)
})
