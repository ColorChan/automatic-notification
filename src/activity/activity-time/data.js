const axios = require(`${rootPath}/http/index`)

const getActivitysWeb = () => {
  return axios.get('http://yys.koncoo.com/')
}


module.exports = { getActivitysWeb }
