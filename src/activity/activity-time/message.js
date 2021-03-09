const moment = require('moment')
const { readCache } = require(`${rootPath}/cache/index`)

const isTodayBefore20 = (targrtDate) => {
  if (targrtDate) {
    const now = moment()
    const today = now.format('YYYY-MM-DD')
    const targrt = moment(targrtDate)
    if (today === targrt.format('YYYY-MM-DD') && now.isBefore(targrt)) {
      return true
    }
  }
  return false
}

const createTodayMessage = () => {
  const cacheMap = readCache('activity')
  const now = moment()
  
  const startList = []
  const middleList = []
  const endList = []
  for (const act of Object.values(cacheMap)) {
    if (act.toastScheme) {
      if (isTodayBefore20(act.toastScheme.startToastTime)) {
        startList.push(`[${act.activityName}] 将于${act.startTime}开始;`)
      }
      if (isTodayBefore20(act.toastScheme.middleToastTime)) {
        const dur = moment(act.toastScheme.endToastTime).diff(now, 'days')
        middleList.push(`[${act.activityName}] 将于${act.endTime}结束，剩余${dur}天;`)
      }
      if (isTodayBefore20(act.toastScheme.endToastTime)) {
        endList.push(`[${act.activityName}] 将于${act.endTime}结束;`)
      }
    }
  }
  const todayMessage = Object.create(null)

  if (startList.length) {
    const content = startList.join(' <br>')
    todayMessage.start = `活动开始提醒： ${content} <br>`
  }
  if (middleList.length) {
    const content = middleList.join(' <br>')
    todayMessage.middle = `活动中期提醒： ${content} <br>`
  }
  if (endList.length) {
    const content = endList.join(' <br>')
    todayMessage.end = `活动即将结束提醒： ${content} <br>`
  }

  let msg = ''
  if (todayMessage.start) {
    msg += todayMessage.start
  }
  if (todayMessage.middle) {
    if (msg.length) {
      msg += '<br>'
    }
    msg += todayMessage.middle
  }
  if (todayMessage.end) {
    if (msg.length) {
      msg += '<br>'
    }
    msg += todayMessage.end
  }
  if (msg) {
    msg += '<br>请悉知'
  }

  return msg
}

module.exports = createTodayMessage
