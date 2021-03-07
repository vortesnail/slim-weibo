/**
 * @description 微博首页 controller
 * @author vortesnail
 */

const xss = require('xss')
const { createBlog, getFollowersBlogList } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
  createBlogFailInfo,
} = require('../model/ErrorInfo')
const { PAGE_SIZE, REG_FOR_AT_WHO } = require('../conf/constant')
const { getUserInfo } = require('../services/user')
const { createAtRelation } = require('../services/at-relation')

/**
 * 创建微博
 * @param {object} param0 创建微博所需的数据 { userId, content, image }
 */
async function create({ userId, content, image }) {
  // 分析并收集 content 中的 @ 用户
  // content 如 '你好，啊 @kaisei - 董轩宇，还有 @sean - 肖恩 你也是哦'
  const atUserNameList = []
  content = content.replace(REG_FOR_AT_WHO, (matchStr, nickName, userName) => {
    atUserNameList.push(userName)
    return matchStr
  })

  // 根据 @ 用户名查询用户信息
  const atUserList = await Promise.all(
    atUserNameList.map(userName => getUserInfo(userName))
  )

  // 根据用户信息，获取用户 id
  const atUserIdList = atUserList.map(user => user.id)

  try {
    const blog = await createBlog({
      userId,
      content: xss(content),
      image
    })
    // 创建 @ 关系
    await Promise.all(atUserIdList.map(userId => createAtRelation(blog.id, userId)))

    return new SuccessModel(blog)
  } catch (ex) {
    console.error(ex.message, ex.stack)
    return new ErrorModel(createBlogFailInfo)
  }
}

/**
 * 获取首页微博列表
 * @param {number} userId 用户 id
 * @param {number} pageIndex 页码
 */
async function getHomeBlogList(userId, pageIndex = 0) {
  const result = await getFollowersBlogList({
    userId,
    pageIndex,
    pageSize: PAGE_SIZE
  })
  const { count, blogList } = result

  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count
  })
}

module.exports = {
  create,
  getHomeBlogList,
}
