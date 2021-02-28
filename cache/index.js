const moment = require('moment')
const { readFile, writeFile } = require(`${rootPath}/utils/file`)

const cacheNameMap = {
  activity: 'activity-cache.json'
}
const updateCache = (type, newData) => {
  const cache = readCache(type)
  for (const actKey of Object.keys(newData)) {
    if (cache[actKey]) {
      if (newData[actKey].startTime) {
        cache[actKey].startTime = newData[actKey].startTime
      }
      if (newData[actKey].endTime) {
        cache[actKey].endTime = newData[actKey].endTime
      }
    } else {
      cache[actKey] = newData[actKey]
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
