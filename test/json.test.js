/**
 * @description json test
 * @author vortesnail
 */

const server = require('./server')

it('/json response data should be correct', async () => {
  const res = await server.get('/json')
  expect(res.body).toEqual({
    title: 'koa2 json',
  })
})
