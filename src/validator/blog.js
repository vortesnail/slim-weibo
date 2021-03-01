/**
 * @description blog 数据格式校验
 * @author vortesnail
 */

const validate = require('./_validate')

// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    content: {
      type: 'string'
    },
    image: {
      type: 'string',
      maxLength: 255,
    }
  }
}

/**
 * 校验微博数据格式
 * @param {object} data 微博数据
 */
function blogValidate(data = {}) {
  return validate(SCHEMA, data)
}

module.exports = blogValidate
