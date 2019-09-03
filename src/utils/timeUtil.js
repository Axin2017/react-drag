/**
 * 时间格式化
 *
 * @param {Date} date
 * @param {string} formatStr - 格式化字符串，如'yyyy-MM-dd'
 * @returns {string} 格式化后的日期字符串
 */
function format(date, formatStr) {
  if (date.constructor !== Date) {
    return date
  }
  const rule = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds() // 毫秒
  }
  if ((/(y+)/).test(formatStr)) {
    formatStr = formatStr.replace(RegExp.$1, this.getFullYear() + '')
  }
  for (var k in rule) {
    if (new RegExp('(' + k + ')').test(formatStr)) {
      formatStr = formatStr.replace(RegExp.$1, rule[k])
    }
  }
  return formatStr
}

/**
 * 获取剩余天数
 *
 * @param {Date} deadline - 截至日期
 * @param {Date} [now=new Date()] - 当前日期，默认当日
 * @param {boolean} [containsToday=true] - 是否包含当天
 * @returns {number} 返回剩余天数
 */
function getDaysLeft(deadline, now = new Date(), containsToday = true) {
  if (deadline.constructor !== Date) {
    throw new Error('param deadline is not a Date')
  }
  return (
    (new Date(deadline.getFullYear(), deadline.getMonth() + 1, deadline.getDate()) - new Date(now.getFullYear(), now.getMonth() + 1, now.getDate())) /
      1000 / 60 / 60 / 24 +
    (containsToday ? 1 : 0)
  )
}

/**
 * 获取超时时间
 *
 * @param {Date} deadline - 截至日期
 * @param {Date} [now=new Date()] - 当前日期，默认当日
 * @returns {string} 返回超时时间
 */
function getOverTimeStr(deadline, now = new Date()) {
  if (deadline.constructor !== Date) {
    throw new Error('param deadline is not a Date')
  }
  let timespan = now - deadline
  let overTimeStr = ''
  const day = Math.floor(timespan / (3600 * 1000 * 24))
  if (day) {
    overTimeStr += day + '天'
    timespan = timespan - day * 3600 * 1000 * 24
  }
  const hour = Math.floor(timespan / (3600 * 1000))
  if (hour) {
    overTimeStr += hour + '时'
    timespan = timespan - hour * 3600 * 1000
  }
  const minutes = Math.floor(timespan / (60 * 1000))
  if (minutes) {
    overTimeStr += minutes + '分'
  }
  return overTimeStr
}

export { format, getDaysLeft, getOverTimeStr }
