/**
 * @description 个人主页 test
 * @author vortesnail
 */

const server = require('../server')
const { USER_NAME, COOKIE } = require('../testUserInfo')

it('个人主页加载第一页数据应该成功', async () => {
  const res = await server
    .get(`/api/profile/loadMore/${USER_NAME}/0`)
    .set('cookie', COOKIE)

  expect(res.body.errno).toBe(0)

  const data = res.body.data
  expect(data).toHaveProperty('isEmpty')
  expect(data).toHaveProperty('blogList')
  expect(data).toHaveProperty('pageSize')
  expect(data).toHaveProperty('pageIndex')
  expect(data).toHaveProperty('count')
})
