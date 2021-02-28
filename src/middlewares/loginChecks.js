/**
 * @description 登录验证中间件
 * @author vortesnail
 */

const { ErrorModel } = require('../model/ResModel')
const { loginCheckFailInfo } = require('../model/ErrorInfo')

/**
 * API 登录验证
 * @param {object} ctx koa2 ctx
 * @param {function} next koa2 next
 */
async function loginCheck(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    await next()
    return
  }
  // 未登录
  ctx.body = new ErrorModel(loginCheckFailInfo)
}

/**
 * 页面登录验证
 * @param {object} ctx koa2 ctx
 * @param {function} next koa2 next
 */
async function loginRedirect(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    await next()
    return
  }
  // 未登录
  const curUrl = ctx.url
  // 带上 url 是为了让前端能做以下工作：
  // 拿到 url，在用户登录成功之后直接跳到用户本来想访问的路由
  ctx.redirect('/login?url' + encodeURIComponent(curUrl))
}

module.exports = {
  loginCheck,
  loginRedirect,
}
