/**
 * @description sequelize 同步数据库
 * @author vortesnail
 */ 

const seq = require('./seq')

require('./model/index')

// 测试链接
seq.authenticate().then(() => {
  console.log('Connection has been established successfully.')
}).catch((err) => {
  console.error('Unable to connect to the database:', err)
})

// 执行同步
seq.sync({ force: true }).then(() => {
  console.log('sync ok')
  process.exit()
})