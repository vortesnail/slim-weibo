/**
 * @description 微博缓存层
 * @author vortesnail
 */

const { set, get } = require('./_redis')
const { getBlogListByUser } = require('../services/blog')

// redis key 前缀
const KEY_PREFIX = 'weibo:square:'

/**
 * 获取广场列表的缓存
 * @param {number} pageIndex 页码
 * @param {number} pageSize 页大小
 */
async function getSquareCacheList(pageIndex, pageSize) {
  const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`

  // 尝试获取缓存
  const cacheResult = await get(key)
  if (cacheResult) {
    // 获取缓存成功
    return cacheResult
  }

  // 没有缓存，则读取数据库
  const result = await getBlogListByUser({
    pageIndex,
    pageSize
  })
  // 设置缓存
  set(key, result, 60)
  return result
}

module.exports = {
  getSquareCacheList
}
