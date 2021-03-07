/**
 * @description 微博 @ 用户 关系 service
 * @author vortesnail
 */

const { AtRelation, Blog, User } = require('../db/model/index')
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

/**
 * 获取 @ 用户的微博数量
 * @param {number} userId 
 */
async function getAtRelationCount(userId) {
  const result = await AtRelation.findAndCountAll({
    where: {
      userId,
      isRead: false
    }
  })
  return result.count
}

/**
 * 获取 @ 用户的微博列表
 * @param {object} param0 查询条件 { userId, pageIndex, pageSize }
 */
async function getAtUserBlogList({ userId, pageIndex, pageSize }) {
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageIndex * pageSize,
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: AtRelation,
        attributes: ['userId', 'blogId'],
        where: {
          userId,
        }
      },
      {
        model: User,
        attributes: ['userName', 'nickName', 'avatar'],
      }
    ]
  })

  let blogList = result.rows.map(row => row.dataValues)
  blogList = formatBlog(blogList)
  blogList = blogList.map(blogItem => {
    blogItem.user = formatUser(blogItem.user.dataValues)
    return blogItem
  })

  return {
    count: result.count,
    blogList
  }
}

module.exports = {
  createAtRelation,
  getAtRelationCount,
  getAtUserBlogList,
}
