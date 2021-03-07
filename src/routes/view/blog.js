/**
 * @description blog view 路由
 * @author vortesnail
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getSquareBlogList } = require('../../controller/blog-square')
const { isExist } = require('../../controller/user')
const { getFans, getFollowers } = require('../../controller/user-relation')
const { getHomeBlogList } = require('../../controller/blog-home')
const { getAtMeCount } = require('../../controller/blog-at')

// 首页
router.get('/', loginRedirect, async (ctx, next) => {
  const userInfo = ctx.session.userInfo
  const { id: userId } = userInfo

  // 获取第一页数据
  const result = await getHomeBlogList(userId)
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

  // 获取粉丝
  const fansResult = await getFans(userId)
  const { fansCount, fansList } = fansResult.data

  // 获取关注人列表
  const followersResult = await getFollowers(userId)
  const { followerCount, followerList } = followersResult.data

  // 获取 @ 数量
  const atCountResult = await getAtMeCount(userId)
  const { count: atCount } = atCountResult.data

  await ctx.render('index', {
    userData: {
      userInfo,
      atCount,
      fansData: {
        count: fansCount,
        list: fansList
      },
      followersData: {
        count: followerCount,
        list: followerList
      },
    },
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count
    }
  })
})

// 个人主页
router.get('/profile', loginRedirect, async (ctx, next) => {
  const { userName } = ctx.session.userInfo
  ctx.redirect(`/profile/${userName}`)
})

router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
  // 已登录用户的信息
  const myUserInfo = ctx.session.userInfo
  const myUserName = myUserInfo.userName

  let curUserInfo
  const { userName: curUserName } = ctx.params
  const isMe = myUserName === curUserName

  if (isMe) {
    // 是当前登录用户
    curUserInfo = myUserInfo
  } else {
    // 不是当前登录用户
    const existResult = await isExist(curUserName)
    if (existResult.errno !== 0) {
      // 用户名不存在
      return
    }
    // 用户名存在
    curUserInfo = existResult.data
  }

  // 获取个人主页第一页微博列表
  const result = await getProfileBlogList(curUserName, 0)
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

  // 获取粉丝
  const fansResult = await getFans(curUserInfo.id)
  const { fansCount, fansList } = fansResult.data

  // 获取关注人列表
  const followersResult = await getFollowers(curUserInfo.id)
  const { followerCount, followerList } = followersResult.data

  // 我是否关注了此人?
  const amIFollowed = fansList.some(item => {
    return item.userName === myUserName
  })

  // 获取 @ 数量
  const atCountResult = await getAtMeCount(myUserInfo.id)
  const { count: atCount } = atCountResult.data

  await ctx.render('profile', {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count
    },
    userData: {
      userInfo: curUserInfo,
      isMe,
      fansData: {
        count: fansCount,
        list: fansList
      },
      followersData: {
        count: followerCount,
        list: followerList
      },
      amIFollowed,
      atCount,
    }
  })
})

// 广场
router.get('/square', loginRedirect, async (ctx, next) => {
  // 获取微博数据，第一页
  const result = await getSquareBlogList(0)
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data || {}

  await ctx.render('square', {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count
    }
  })
})

module.exports = router
