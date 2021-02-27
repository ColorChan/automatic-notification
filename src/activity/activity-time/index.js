const fs = require('fs')
const axios = require(`${rootPath}/http/index`)
const toast = require(`${rootPath}/src/message-center/index`)
const { getActivitysWeb } = require('./data')
const commonHandler = require('./handler')

const activityTimeList = commonHandler(fs.readFileSync(`${rootPath}/getActivitys.html`, { encoding: 'utf-8' }))

module.exports = activityTimeList

