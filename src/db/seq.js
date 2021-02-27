/**
 * @description sequelize 实例
 * @author vortesnail
 */

const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { isProd, isTest } = require('../utils/env')

const { database, user, password, host } = MYSQL_CONF
const conf = {
  host: host,
  dialect: 'mysql',
}

// 测试，去掉多余打印
if (isTest) {
  conf.logging = () => { }
}

// 线上环境，使用连接池
if (isProd) {
  conf.pool = {
    max: 5,
    min: 0,
    idle: 10000,
  }
}

const seq = new Sequelize(database, user, password, conf)

module.exports = seq
