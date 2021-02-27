const { wechatToast } = require('./wechat/index')

const toastMap = {
  wechat: wechatToast
}

const toast = (way) => {
  if (toastMap[way]) {
    toastMap[way]()
  } else {
    console.log('toast  error: ', way, toastMap)
  }
}

module.exports = toast
