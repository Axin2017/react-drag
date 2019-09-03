
import { deepClone } from './objectUtil'

/**
 * 数组转换成树
 *
 * @param {Array} arr array
 * @param {string} idField the id field
 * @param {string} pidField the parent's id field
 * @param {Funcction} rooterFunc the Function to judge array item is rooter node or is not
 * @param {string} childrenName the name of node's children when createing tree,default 'children'
 * @returns {Object} tree object
 */
function arrayToTree(arr, idField, pidField, rooterFunc, childrenName = 'children') {
  // 克隆数组，否则当数组项为对象时，会修改原数组
  let arrCloned = deepClone(arr)
  // 先生成一个映射对象
  const mapObj = arrCloned.reduce((total, current) => {
    total[current[idField]] = current
    return total
  }, {})
  let rooter = null
  // 循环挂载节点，返回根节点
  arrCloned.forEach(element => {
    if (!rooter && rooterFunc(element)) {
      rooter = element
    }
    const parentNode = mapObj[element[pidField]]
    if (parentNode) {
      if (!parentNode[childrenName]) {
        parentNode[childrenName] = []
      }
      parentNode[childrenName].push(element)
    }
  })
  return { mapObj, rooter }
}

export { arrayToTree }
