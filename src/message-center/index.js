const { wechatToast } = require('./wechat/index')
const { updateCache } = require(`${rootPath}/cache/index`)

const toastMap = {
  wechat: wechatToast
}

// 播报过保存，以防重复播报
const saveData = (data) => {
  // const map = Object.create(null)
  // for (const item of data) {
  //   map[item.activityName] = { startTime: item.startTime, endTime: item.endTime }
  // }
  // updateCache('activity', map)
}

const toast = (data, way) => {
  if (!toastMap[way]) {
    console.log('toast error: ', way, toastMap)
    return
  }
  if (data && data.length) {
    saveData(data)
    toastMap[way](data)
  } else {
    console.log('toast no data: ', data)
  }
  
}

module.exports = toast
