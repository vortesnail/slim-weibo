const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    message: '你好 Koa 2！',
    isMe: true
  })
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/profile/:userName', async (ctx, next) => {
  const { userName } = ctx.params
  ctx.body = {
    title: 'this is profile page',
    userName
  }
})

router.get('/loadMore/:userName/:pageIndex', async (ctx, next) => {
  const { userName, pageIndex } = ctx.params
  ctx.body = {
    title: 'this is loadMore api',
    userName,
    pageIndex
  }
})

module.exports = router
