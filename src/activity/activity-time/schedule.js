
const moment = require('moment')
const { readCache } = require(`${rootPath}/cache/index`)

const cacheMap = readCache('activity')
console.log(22222222, cacheMap)


// 活动将要开始推送
const beforeStartScheme = (act) => {
  const today = moment()
  // 已经开始的活动不推送
  if (moment(act.startTime).isSameOrBefore(today)) { return }
  const startDate = ''
  act.toastScheme.startToastTime = ''
  act.toastScheme.startToastText = ''

  
}
const middleScheme = () => {}
const beforeEndScheme = () => {}


// 给cacheMap增加计划表
const addSchedule  = () => {
  for (const actKey of Object.keys(cacheMap)) {
    const act = cacheMap[actKey]
    if (!startTime && !endTime) { continue }
    act.toastScheme = Object.create(null)
    beforeStartScheme()
  }

}

const dataScheme = (list) => {
  const today = moment()

  for (const item of list) {
    const toastScheme = Object.create(null)
    
    console.log(33333333, moment(item.startTime).diff(today, 'days'))
    if (moment(item.startTime).diff(today, 'days') > 1) {
      // toastScheme.startNotice = 
    }
  }
}

// 过滤规则:只播报  未播报过的消息 && (有开始时间 || 有结束时间) && 未结束 && 总持续时间>=72h
const messageFilter = () => {
  
  const msgList = []
  console.log(111111111111, cacheMap)
  for (const item of cacheMap) {
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


const scheduleHandler = () => {

}

module.exports = scheduleHandler
