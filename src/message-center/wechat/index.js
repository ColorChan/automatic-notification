const axios = require(`${rootPath}/http/index`)

const sendMessage = ({ title, content, topic }) => {
  const params = { token: '76aaa6deead747e180ed7ab94a58bee6', title, content, template: 'html', topic }
  console.log(111111111, params)
  return axios.get('http://pushplus.hxtrip.com/send', { params })
}

const wechatToast = (data) => {
  sendMessage(data)
}

module.exports = { wechatToast }
