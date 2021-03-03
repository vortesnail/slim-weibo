/**
 * @description 用户关系 service
 * @author vortesnail
 */

const { User, UserRelation } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * 获取关注该用户的用户列表，即该用户的用户列表
 * @param {number} followerId 被关注人的 id
 */
async function getUsersByFollower(followerId) {
  const result = await User.findAndCountAll({
    attributes: ['id', 'userName', 'nickName', 'avatar'],
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: UserRelation,
        where: {
          followerId
        }
      }
    ]
  })

  let userList = result.rows.map(row => row.dataValues)
  userList = formatUser(userList)

  return {
    count: result.count,
    userList,
  }
}

module.exports = {
  getUsersByFollower,
}
