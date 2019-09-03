import html2canvas from 'html2canvas'
import JsPdf from 'jspdf'
import { getAbsolutePosition } from './domUtil'

/**
 *创建一个带有宽高的canvas
 *
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @returns {HTMLCanvasElement} canvas
 */
async function createCanvas(x, y, width, height) {
  const canvas = await html2canvas(document.body, {
    useCORS: true,
    ignoreElements: (dom) => {
      if (dom.className && typeof (dom.className) === 'string' && dom.className.indexOf('edit-export-save') >= 0) {
        return true
      }
    }
  })
  const clipCanvas = document.createElement('canvas')
  clipCanvas.width = width
  clipCanvas.height = height
  // 截取
  clipCanvas
    .getContext('2d')
    .drawImage(canvas, x, y, width, height, 0, 0, width, height)
  return clipCanvas
}

/**
 * Html元素转成canvas
 *
 * @param {HTMLElement} el
 * @returns {HTMLCanvasElement} canvas
 */
async function elmentToCanvas(el) {
  const pos = getAbsolutePosition(el)
  const canvas = await createCanvas(
    pos.x,
    pos.y,
    el.offsetWidth,
    el.offsetHeight
  )
  return canvas
}

/**
 * html元素导出成img
 * @param {HTMLElement} el
 * @param {String} fileName
 */
async function elToImg(el, fileName) {
  const canvas = await elmentToCanvas(el)
  exportCanvas(canvas, fileName, 'image')
}

/**
 *按类型导出内容（图片、pdf）
 *
 * @param {HTMLCanvasElement} canvas
 * @param {String} fileName
 * @param {String} [type='image']
 */
function exportCanvas(canvas, fileName, type = 'image') {
  const base64Data = canvas.toDataURL()
  switch (type) {
    case 'image':
      let a = document.createElement('a') // 生成一个a元素
      let event = new MouseEvent('click') // 创建一个单击事件
      a.download = fileName || '导出' // 设置图片名称
      a.href = base64Data // 将生成的URL设置为a.href属性
      a.dispatchEvent(event) // 触发a的单击事件
      break
    case 'pdf':
      var pdf = new JsPdf('', 'pt', 'a4')
      //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
      let pdfWidth = 595.28
      let pdfHeight = (592.28 / canvas.width) * canvas.height
      // y方向偏移
      let yOffset = (841.89 - pdfHeight) / 2
      pdf.addImage(base64Data, 'JPEG', 0, yOffset, pdfWidth, pdfHeight)
      pdf.save(fileName)
      break
    default :
      break
  }
}

async function clipDocumentToFile(x, y, width, height, fileName, type = 'image') {
  const canvas = await createCanvas(x, y, width, height)
  exportCanvas(canvas, fileName, type)
}

/**
 * html元素导出成pdf
 * @param {HTMLElement} el
 * @param {String} fileName
 */
async function elToPdf(el, fileName) {
  const canvas = await elmentToCanvas(el)
  exportCanvas(canvas, fileName, 'pdf')
}

export { elToImg, elToPdf, clipDocumentToFile }
