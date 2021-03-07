/**
 * @description 微博 @ 关系 controller
 * @author vortesnail
 */

const { getAtRelationCount, getAtUserBlogList, updateAtRelation } = require('../services/at-relation')
const { SuccessModel } = require('../model/ResModel')
const { PAGE_SIZE } = require('../conf/constant')

/**
 * 获取 @ 我的微博数量
 * @param {number} userId 用户 Id
 */
async function getAtMeCount(userId) {
  const count = await getAtRelationCount(userId)
  return new SuccessModel({
    count
  })
}

/**
 * 获取 @ 用户的博客列表
 * @param {number} userId 用户 Id
 * @param {number} pageIndex 页码
 */
async function getAtMeBlogList(userId, pageIndex = 0) {
  const result = await getAtUserBlogList({
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
    count,
  })
}

async function markAsRead(userId) {
  try {
    await updateAtRelation(
      { newIsRead: true },
      { userId, isRead: false }
    )
  } catch (ex) {
    console.error(ex)
  }
}

module.exports = {
  getAtMeCount,
  getAtMeBlogList,
  markAsRead,
}
