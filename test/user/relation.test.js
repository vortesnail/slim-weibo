/**
 * @description relation api test
 * @author vortesnail
 */

const server = require('../server')
const { getFans, getFollowers } = require('../../src/controller/user-relation')
const {
  V_ID,
  V_USER_NAME,
  V_COOKIE,
  K_ID,
  K_USER_NAME,
  K_COOKIE,
} = require('../testUserInfo')

it('无论如何，先取消关注，应该成功', async () => {
  const res = await server
    .post('/api/profile/unFollow')
    .send({ userId: K_ID })
    .set('cookie', V_COOKIE)
  expect(1).toBe(1)
})

it('v关注k，应该成功', async () => {
  const res = await server
    .post('/api/profile/follow')
    .send({ userId: K_ID })
    .set('cookie', V_COOKIE)
  expect(res.body.errno).toBe(0)
})

it('获取k的粉丝，应该有v', async () => {
  const result = await getFans(K_ID)
  const { fansCount, fansList } = result.data
  const hasUserName = fansList.some(fanInfo => {
    return fanInfo.userName === V_USER_NAME
  })
  expect(fansCount > 0).toBe(true)
  expect(hasUserName).toBe(true)
})

it('获取v的关注人，应该有k', async () => {
  const result = await getFollowers(V_ID)
  const { followerCount, followerList } = result.data
  const hasUserName = followerList.some(followerInfo => {
    return followerInfo.userName === K_USER_NAME
  })
  expect(followerCount > 0).toBe(true)
  expect(hasUserName).toBe(true)
})

it('v取消关注k，应该成功', async () => {
  const res = await server
    .post('/api/profile/unFollow')
    .send({ userId: K_ID })
    .set('cookie', V_COOKIE)
  expect(res.body.errno).toBe(0)
})


