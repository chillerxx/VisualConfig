export const gridW = 15
export const gridH = 15
export const colGridNum = 46
export const rowGridNum = 70
export const canvasWidth = gridW * colGridNum + 1  //691
export const canvasHeight = gridH * rowGridNum //900//1050 

function calcGridSize(distance, grid) {
  // 得到每次缩放的余数
  const r = Math.abs(distance) % grid
  // 正负grid
  const mulGrid = distance > 0 ? grid : -grid
  let result = 0
  // 余数大于grid的1/2
  if (r > grid / 2) {
    result = mulGrid * Math.ceil(Math.abs(distance) / grid)
  } else {
    result = mulGrid * Math.floor(Math.abs(distance) / grid)
  }
  return result
}

export function calcELemPositonAndSize(name, oldStyle, style, distance) {
  let disX = style.zoomGrid ? distance.x : calcGridSize(distance.x, gridW)
  let disY = style.zoomGrid ? distance.y : calcGridSize(distance.y, gridH)

  // 是否是上方缩放圆点
  const hasT = name.includes('n')
  // 是否是左方缩放圆点
  const hasL = name.includes('w')

  style.width = oldStyle.width + (hasL ? -disX : disX)
  style.height = oldStyle.height + (hasT ? -disY : disY)

  // 如果是左侧缩放圆点，修改left位置
  style.left = oldStyle.left + (hasL ? disX : 0)

  // 如果是上方缩放圆点，修改top位置
  style.top = oldStyle.top + (hasT ? disY : 0)

  if (name.length == 1) { // 如果是四个正方位
    if (['n', 's'].includes(name)) {
      // 上下就不改变宽度
      style.width = oldStyle.width
    } else {
      // 左右就不改变高度
      style.height = oldStyle.height
    }
  }

  // 处理逆向缩放
  if (style.width < 0) {
    style.width = -style.width
    style.left -= style.width
  }
  if (style.height < 0) {
    style.height = -style.height
    style.top -= style.height
  }
}

export const getBase64 = (img, callback) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

export const cloneDeep = (src) => JSON.parse(JSON.stringify(src))
