/**
 * deepClone
 *
 * @param {any} obj
 * @returns any
 */
function deepClone(obj) {
  if (obj == null) {
    return obj
  }
  if (typeof obj !== 'object') {
    return obj
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj)
  }
  if (obj instanceof Date) {
    return new Date(obj)
  }
  if (obj instanceof Array) {
    return obj.map(item => {
      return deepClone(item)
    })
  }
  let newObj = {}
  for (let key in obj) {
    newObj[key] = deepClone(obj[key])
  }
  return newObj
}

export { deepClone }
