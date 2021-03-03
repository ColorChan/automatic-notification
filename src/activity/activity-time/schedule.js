
const moment = require('moment')
const { readCache, writeCache } = require(`${rootPath}/cache/index`)

// 活动将要开始推送
const beforeStartScheme = (act) => {
  if (!act.startTime) { return }
  // 晚于活动开始前一天的20:00的活动不推送
  const today = moment()
  const targetSendTimeStr = moment(act.startTime).subtract(1, 'days').format('YYYY-MM-DD') + ' 20:00'
  if (moment(targetSendTimeStr).isSameOrBefore(today)) { return }

  act.toastScheme.startToastTime = targetSendTimeStr
}

// 活动中期推送
const middleScheme = (act) => {
  if (!act.startTime || !act.startTime) { return }
  // 活动总持续时间小于72h不推送
  const timeLength = moment(act.endTime).diff(moment(act.startTime), 'hours')
  if (timeLength < 72) { return }

  // 已经过了中期提醒时间不提醒
  const today = moment()
  const targetSendTimeStr = moment(act.startTime).add(timeLength / 2, 'h').format('YYYY-MM-DD') + ' 20:00'
  if (moment(targetSendTimeStr).isSameOrBefore(today)) { return }
  
  act.toastScheme.middleToastTime = targetSendTimeStr
}
// 活动将要结束推送
const beforeEndScheme = (act) => {
  if (!act.endTime) { return }
  // 晚于活动结束前一天的20:00的活动不推送
  const today = moment()
  const targetSendTimeStr = moment(act.endTime).subtract(1, 'days').format('YYYY-MM-DD') + ' 20:00'
  if (moment(targetSendTimeStr).isSameOrBefore(today)) { return }

  act.toastScheme.endToastTime = targetSendTimeStr
}

// 给cacheMap增加计划表
const addSchedule  = () => {
  const cacheMap = readCache('activity')
  for (const actKey of Object.keys(cacheMap)) {
    const act = cacheMap[actKey]
    if (!act.startTime && !act.endTime) { continue }
    act.toastScheme = Object.create(null)
    beforeStartScheme(act)
    middleScheme(act)
    beforeEndScheme(act)
  }
  writeCache('activity', cacheMap)
}

const scheduleHandler = () => {
  addSchedule()
}

module.exports = scheduleHandler
