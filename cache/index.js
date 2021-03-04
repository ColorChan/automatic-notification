const moment = require('moment')
const { readFile, writeFile } = require(`${rootPath}/utils/file`)

const cacheNameMap = {
  activity: 'activity-cache.json'
}
const updateCache = (type, newData) => {
  const cache = readCache(type)
  for (const actKey of Object.keys(newData)) {
    if (cache[actKey] && newData[actKey]) {
      for (const key of Object.keys(newData[actKey])) {
        if (cache[actKey][key] && typeof cache[actKey][key] === 'object') {
          Object.assign(cache[actKey][key], newData[actKey][key])
        } else {
          if (newData[actKey][key]) {
            cache[actKey][key] = newData[actKey][key]
          }
        }
      }
    } else {
      if (newData[actKey]) {
        cache[actKey] = newData[actKey]
      }
    }
  }

  const today = moment()
  for (const actKey of Object.keys(cache)) {
    if (cache[actKey].endTime) {
      if (moment(cache[actKey].endTime).isBefore(today)) {
        delete cache[actKey]
      }
    }
  }
  writeCache(type, cache)
}

const readCache = (type) => {
  return readFile(`/cache/${cacheNameMap[type]}`)
}
const writeCache = (type, data) => {
  return writeFile(`/cache/${cacheNameMap[type]}`, data)
}


module.exports = { updateCache, readCache, writeCache }
