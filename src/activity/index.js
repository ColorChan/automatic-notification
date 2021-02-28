const moment = require('moment')
const activityTimeList = require('./activity-time/index')
const { readCache } = require(`${rootPath}/cache/index`)

const cacheMap = readCache('activity')

const dataScheme = (list) => {
  const today = moment()
  for (const item of list) {
    const toastScheme = Object.create(null)
    if (moment(item.startTime).diff(today, 'days') > 1) {
      
    }
  }
}

// 过滤规则:只播报  未播报过的消息 && (有开始时间 || 有结束时间) && 未结束 && 总持续时间>=72h
const messageFilter = () => {
  const today = moment()
  const msgList = []

  for (const item of activityTimeList) {
    // if (cacheMap[item.activityName].isToasted) { continue }
    // 从缓存补充信息
    if (!item.startTime) {
      if (cacheMap[item.activityName].startTime) {
        item.startTime = cacheMap[item.activityName].startTime
      }
    }
    if (!item.endTime) {
      if (cacheMap[item.activityName].endTime) {
        item.endTime = cacheMap[item.activityName].endTime
      }
    }

    if (!item.startTime && !item.endTime) { continue }
    if (item.endTime) {
      if (moment(item.endTime).isBefore(today)) { continue }
    }
    // if (item.startTime && item.endTime) {
    //   if (moment(item.endTime).diff(moment(item.startTime), 'hours') < 72) { continue }
    // }

    msgList.push(item)
  }
  
  return dataScheme(msgList)
}

module.exports = { activityTimeList: messageFilter() }
