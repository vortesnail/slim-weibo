/**
 * @description user model test
 * @author vortesnail
 */

const { User } = require('../../src/db/model/index')

it('User 模型的各个属性，符合预期', () => {
  // build 会构建一个内存的 User 实例，但不会提交到数据库中
  const user = User.build({
    userName: 'zhangsan',
    password: '123',
    nickName: '张三',
    // gender: 1,
    avatar: '/xxx.png',
    city: '杭州',
  })
  // 验证各个属性
  expect(user.userName).toBe('zhangsan')
  expect(user.password).toBe('123')
  expect(user.nickName).toBe('张三')
  expect(user.gender).toBe(3)
  expect(user.avatar).toBe('/xxx.png')
  expect(user.city).toBe('杭州')
})
