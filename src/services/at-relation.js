/**
 * @description 微博 @ 用户 关系 service
 * @author vortesnail
 */

const { AtRelation } = require('../db/model/index')
const { formatUser, formatBlog } = require('./_format')

/**
 * 创建微博 @ 用户的关系
 * @param {number} blogId 微博 Id
 * @param {numer} userId 用户 Id
 */
async function createAtRelation(blogId, userId) {
  const result = await AtRelation.create({
    blogId,
    userId,
  })
  return result.dataValues
}

module.exports = {
  createAtRelation,
}
