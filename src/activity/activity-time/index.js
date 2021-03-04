const schedule = require('node-schedule');
const { getActivitysWeb } = require('./data')
const commonHandler = require('./handler')
const scheduleHandler = require('./schedule')
const createTodayMessage = require('./message')
const toast = require(`${rootPath}/src/message-center/index`)
const { updateCache } = require(`${rootPath}/cache/index`)

const getActivityTimeList = async () => {
  const res = await getActivitysWeb()
  const map = Object.create(null)
  for (const item of commonHandler(res.data)) {
    map[item.activityName] = { startTime: item.startTime, endTime: item.endTime, activityName: item.activityName }
  }
  updateCache('activity', map)
}


getActivityTimeList()
scheduleHandler()
const content = createTodayMessage()
if (content) {
  const messageData = {
    title: '活动时间通知',
    content,
    topic: 'yys_03'
  }
  toast(messageData, 'wx')
}
