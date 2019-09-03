import { trim } from './stringUtil'

/**
 * 判断是否有class
 *
 * @param {elmentnode} el
 * @param {string} cls
 * @returns {boolean}
 */
function hasClass (el, cls) {
  if (!el || !cls) {
    return false
  }
  if (cls.indexOf(' ') !== -1) {
    throw new Error('className should not contain space.')
  }
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
  }
}

/**
 * 添加class
 *
 * @param {elmentnode} el
 * @param {string} cls
 */
function addClass (el, cls) {
  if (!el) {
    return
  }
  var curClass = el.className
  var classes = (cls || '').split(' ')

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i]
    if (!clsName) {
      continue
    }

    if (el.classList) {
      el.classList.add(clsName)
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName
    }
  }
  if (!el.classList) {
    el.className = curClass
  }
}

/**
 * 删除class
 *
 * @param {elementnode} el
 * @param {string} cls
 */
function removeClass (el, cls) {
  if (!el || !cls) {
    return
  }
  var classes = cls.split(' ')
  var curClass = ' ' + el.className + ' '

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i]
    if (!clsName) {
      continue
    }

    if (el.classList) {
      el.classList.remove(clsName)
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ')
    }
  }
  if (!el.classList) {
    el.className = trim(curClass)
  }
}

/**
 * 获取元素绝对定位位置
 *
 * @param {Object} el
 * @returns
 */
function getAbsolutePosition(el) {
  var pos = {}
  pos.x = el.offsetLeft + el.clientLeft
  pos.y = el.offsetTop + el.clientTop
  let p = el.offsetParent
  while (p) {
    pos.x += (p.offsetLeft + p.clientLeft)
    pos.y += (p.offsetTop + p.clientTop)
    p = p.offsetParent
  }
  return pos
}

export { hasClass, addClass, removeClass, getAbsolutePosition }
