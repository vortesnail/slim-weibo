/**
 * @description 微博 @ 用户 的关系数据模型
 * @author vortesnail
 */

const seq = require('../seq')
const { INTEGER, BOOLEAN } = require('../types')

const AtRelation = seq.define('atRelation', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户 Id'
  },
  blogId: {
    type: INTEGER,
    allowNull: false,
    comment: '微博 Id'
  },
  isRead: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: '是否已读'
  }
})

module.exports = AtRelation
