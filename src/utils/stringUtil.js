
/**
 * 去除字符串中的空格
 *
 * @param {string} string
 * @returns {string}
 */
function trim (string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}

export { trim }
