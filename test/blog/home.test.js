/**
 * @description home api test
 * @author vortesnail
 */

const server = require('../server')
const { COOKIE } = require('../testUserInfo')

// 存储微博 id
let BLOG_ID = ''

it('创建一条微博，应该成功', async () => {
  // 定义测试内容
  const content = '单元测试自动创建的微博_' + Date.now()
  const image = '/test.png'

  // 开始测试
  const res = await server
    .post('/api/blog/create')
    .send({
      content,
      image
    })
    .set('cookie', COOKIE)

  expect(res.body.errno).toBe(0)
  expect(res.body.data.content).toBe(content)
  expect(res.body.data.image).toBe(image)

  // 记录微博 id
  BLOG_ID = res.body.data.id
})
