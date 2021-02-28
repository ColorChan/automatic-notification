const fs = require('fs')

const readFile = (rePath) => {
  return JSON.parse(fs.readFileSync(`${rootPath}/${rePath}`, { encoding: 'utf-8' }))
}
const writeFile = (rePath, data) => {
  return fs.writeFileSync(`${rootPath}/${rePath}`, JSON.stringify(data), { encoding: 'utf-8' })
}


module.exports = { readFile, writeFile }
