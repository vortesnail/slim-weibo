/**
 * @description user service
 * @author vortesnail
 */

const { User } = require('../db/model/index')
const { formatUser } = require('./_format')
const { addFollower } = require('./user-relation')

/**
 * 获取用户信息
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function getUserInfo(userName, password) {
  // 查询条件
  const whereOpt = {
    userName
  }
  if (password) {
    Object.assign(whereOpt, { password })
  }

  // 查询
  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'avatar', 'city'],
    where: whereOpt
  })
  if (result === null) {
    return result
  }

  // 格式化处理
  const formatRes = formatUser(result.dataValues)

  return formatRes
}

/**
 * 创建用户
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别 （1 男，2 女，3 保密）
 * @param {string} nickName 昵称
 */
async function createUser({ userName, password, gender = 3, nickName }) {
  const result = await User.create({
    userName,
    password,
    gender,
    nickName: nickName ? nickName : userName
  })
  const data = result.dataValues

  // 自己关注自己（为了方便首页获取数据）
  addFollower(data.id, data.id)

  return data
}

/**
 * 删除用户
 * @param {string} userName 用户名
 */
async function deleteUser(userName) {
  const result = await User.destroy({
    where: {
      userName,
    }
  })
  return result > 0
}

/**
 * 更新用户信息
 * @param {object} param0 要修改的内容 newPassword, newNickName, newAvatar, newCity
 * @param {object} param1 查询条件 userName, password
 */
async function updateUser(
  { newPassword, newNickName, newAvatar, newCity },
  { userName, password }
) {
  // 拼接修改内容
  const updateData = {}
  if (newPassword) {
    updateData.password = newPassword
  }
  if (newNickName) {
    updateData.nickName = newNickName
  }
  if (newAvatar) {
    updateData.avatar = newAvatar
  }
  if (newCity) {
    updateData.city = newCity
  }

  // 拼接查询条件
  const whereData = {
    userName
  }
  if (password) {
    whereData.password = password
  }

  // 执行修改
  const result = await User.update(updateData, {
    where: whereData
  })
  return result[0] > 0
}

module.exports = {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser,
}
