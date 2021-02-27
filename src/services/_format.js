/**
 * @description 数据格式化
 * @author vortesnail
 */

const { DEFAULT_AVATAR } = require('../conf/constant')

/**
 * 用户默认头像
 * @param {object} obj 用户对象
 */
function _formatUserAvatar(obj) {
  if (obj.avatar === null) {
    obj.avatar = DEFAULT_AVATAR
  }
  return obj
}

/**
 * 格式化用户信息
 * @param {object|array} list 用户列表或者单个用户对象
 */
function formatUser(list) {
  if (list === null) {
    return list
  }

  if (list instanceof Array) {
    return list.map(_formatUserAvatar)
  }

  // 单个对象
  return _formatUserAvatar(list)
}

module.exports = {
  formatUser,
}
