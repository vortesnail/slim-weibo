/**
 * @description 存储配置
 * @author vortesnail
 */

const { isProd } = require('../utils/env')

let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1',
}

let MYSQL_CONF = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'chenxin109133106',
  database: 'slim_weibo_db',
}

if (isProd) {
  // 线上 redis 配置
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1',
  }
  // 线上 mysql 配置
  MYSQL_CONF = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'chenxin109133106',
    database: 'slim_weibo_db',
  }
}

module.exports = {
  REDIS_CONF,
  MYSQL_CONF,
}
