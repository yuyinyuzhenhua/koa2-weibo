const router = require('koa-router')()

// router.get('/', async (ctx, next) => {
//   await ctx.render('index', {
//     title: 'Hello Koa 2!'
//   })
// })

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  // const session = ctx.session;
  // if(session.viewNum == null){
  //   session.viewNum = 0;
  // }
  // session.viewNum++;

  ctx.body = {
    title: 'koa2 json',
    // viewNum: session.viewNum
  }
})

router.get('/profile/:username', async (ctx, next) => {
  ctx.body = {
    "title": "this is profile page",
    "username": ctx.params.username
  }
})

router.get('/loadmore/:username/:pageIndex', async (ctx, next) => {
  let { username, pageIndex } = ctx.params
  ctx.body = {
    "title": "this is loadmore",
    username,
    pageIndex
  }
})

module.exports = router
