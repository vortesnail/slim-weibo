/**
 * @description blog service
 * @author vortesnail
 */

const { Blog, User, UserRelation } = require('../db/model/index')
const { formatUser, formatBlog } = require('./_format')

/**
 * 创建微博
 * @param {object} param0 创建微博所需的数据 { userId, content, image }
 */
async function createBlog({ userId, content, image }) {
  const result = await Blog.create({
    userId,
    content,
    image
  })
  return result.dataValues
}

/**
 * 根据用户获取微博列表
 * @param {*} param0 查询参数 { userName, pageIndex = 0, pageSize = 10 }
 */
async function getBlogListByUser({ userName, pageIndex = 0, pageSize = 10 }) {
  const userWhereOpts = {}
  if (userName) {
    userWhereOpts.userName = userName
  }

  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageSize * pageIndex,
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'avatar'],
        where: userWhereOpts
      }
    ]
  })
  // result.count 总数，跟分页无关
  // result.rows 查询结果，数组
  let blogList = result.rows.map(row => row.dataValues)

  // 格式化
  blogList = formatBlog(blogList)
  blogList = blogList.map((blogItem) => {
    const user = blogItem.user.dataValues
    blogItem.user = formatUser(user)
    return blogItem
  })

  return {
    count: result.count,
    blogList,
  }
}

/**
 * 获取关注者的微博列表（首页）
 * @param {object} param0 查询条件 { userId, pageIndex = 0, pageSize = 10 }
 */
async function getFollowersBlogList({ userId, pageIndex = 0, pageSize = 10 }) {
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageSize * pageIndex,
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'avatar']
      },
      {
        model: UserRelation,
        attributes: ['userId', 'followerId'],
        where: {
          userId,
        }
      }
    ]
  })

  // 格式化数据
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
  createBlog,
  getBlogListByUser,
  getFollowersBlogList,
}
