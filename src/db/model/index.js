/**
 * @description 数据模型入口文件
 * @author vortesnail
 */

const User = require('./User')
const Blog = require('./Blog')

// 查询微博时顺带查出用户
Blog.belongsTo(User, {
  foreignKey: 'userId'
})

module.exports = {
  User,
  Blog,
}
