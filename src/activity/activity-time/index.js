const fs = require('fs')
const axios = require(`${rootPath}/http/index`)
const toast = require(`${rootPath}/src/message-center/index`)
const { getActivitysWeb } = require('./data')
const commonHandler = require('./handler')
const scheduleHandler = require('./schedule')
const { updateCache } = require(`${rootPath}/cache/index`)

const activityTimeList = commonHandler(fs.readFileSync(`${rootPath}/getActivitys.html`, { encoding: 'utf-8' }))

const map = Object.create(null)

for (const item of activityTimeList) {
  map[item.activityName] = { startTime: item.startTime, endTime: item.endTime }
}

scheduleHandler()

updateCache('activity', map)
