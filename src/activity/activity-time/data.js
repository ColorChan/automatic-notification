const axios = require(`${rootPath}/http/index`)

const getActivitysWeb = () => {
  return axios.get('http://cc.koncoo.com/yys/default.aspx')
}


module.exports = { getActivitysWeb }
