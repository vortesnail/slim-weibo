const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    isMe: true,
    blogList: [
      {
        id: 1,
        title: 'aaa',
      }, {
        id: 2,
        title: 'bbb',
      }, {
        id: 3,
        title: 'ccc',
      }
    ]
  })
})

router.get('/json', async (ctx, next) => {
  const session = ctx.session
  if (session.viewNum === null) {
    session.viewNum = 0 
  }
  session.viewNum++

  ctx.body = {
    title: 'koa2 json',
    viewNum: session.viewNum,
  }
})

router.get('/profile/:userName', async (ctx, next) => {
  const { userName } = ctx.params
  ctx.body = {
    title: 'This is a profile page',
    userName
  }
})

router.get('/loadMore/:userName/:pageIndex', async (ctx, next) => {
  const { userName, pageIndex } = ctx.params
  ctx.body = {
    title: 'This is a loadMore API',
    userName,
    pageIndex
  }
})

module.exports = router
