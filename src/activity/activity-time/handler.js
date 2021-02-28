const { parse } = require('node-html-parser')

let contentDom = null
let activityDomList = []
let dates = []
const year = new Date().getFullYear()

const cutContent = (dom) => {
  return parse(dom).querySelector('div.table-responsive')
}

const getDates = () => {
  const dateLine = contentDom.querySelector('tr.active.text-center.small')
  const dateLineItemList = []
  for (const td of dateLine.querySelectorAll('td')) {
    if (td.innerText.length && td.innerText.includes('/')) {
      dateLineItemList.push(td.innerText.trim())
    }
  }
  return dateLineItemList
}

const cutActivitysDom = () => {
  const arr = []
  for (const line of contentDom.querySelectorAll('tr.active.text-center.small')) {
    if (!line.classNames.includes('overtime')) {
      const innerText = line.querySelector('td.text-left').innerText
      if (innerText && innerText.length) {
        arr.push(line)
      }
    }
  }
  return arr
}

const getActivityStatus = () => {
  const arr = []
  for (const activityDom of activityDomList) {
    const activity = Object.create(null)
    const tdList = activityDom.querySelectorAll('td')
    for (const tdIndex in tdList) { 
      const td = tdList[tdIndex]
      if (td.classNames.length) {
        if (td.classNames.includes('text-left')) {
          activity.activityName = td.innerText
          continue
        }
        if (td.classNames.includes('warning') || td.classNames.includes('info')) {
          if (td.querySelector('span.small')) {
            const day = dates[tdIndex - 1].replace('/', '-')
            const date = `${year}-${day}`
            const innerText = td.querySelector('span.small').innerText
            const time = innerText.match(/\d\d:\d\d/)
            if (innerText.includes('开始')) {
              activity.startTime = `${date} ${time}`
              // activity.sid = `${date}-${activity.activityName}`
            }
            if (innerText.includes('结束')) {
              activity.endTime = `${date} ${time}`
              // activity.eid = `${date}-${activity.activityName}`
            }
          }
        }
      }
    }
    arr.push(activity)
  }
  return arr
}

const commonHandler = (domText) => {
  contentDom = cutContent(domText)
  activityDomList = cutActivitysDom()
  dates = getDates()
  const activityStatus = getActivityStatus()
  return activityStatus
}

module.exports = commonHandler
