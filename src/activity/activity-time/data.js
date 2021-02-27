const axios = require(`${rootPath}/http/index`)

const getActivitysWeb = () => {
  return axios.get('http://cc.koncoo.com/yys/default.aspx')
}


module.exports = { getActivitysWeb }


// .then((res) => {
//   console.log(1111111, res.status)
//   console.log(222, res.statusText)
//   console.log(333, res.headers)
//   console.log(444, res.config)
//   console.log(555, res.request)
//   if (res) {
//     if (res.status === 200) {
//       toast('wechat')
//     } else {
//       console.log('getActivitys  error: ', res.statusText)
//     }
//   }
//   fs.writeFileSync('getActivitys.html', res.data, { encoding: 'utf8' })
// })