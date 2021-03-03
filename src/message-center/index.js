const { wechatToast } = require('./wechat/index')
const { updateCache } = require(`${rootPath}/cache/index`)

const toastMap = {
  wx: wechatToast
}

const toast = (data, way) => {
  if (!toastMap[way]) {
    console.log('toast error: ', way, toastMap)
    return
  }
  if (data) {
    toastMap[way](data)
  } else {
    console.log('toast no data: ', data)
  }
  
}

module.exports = toast
