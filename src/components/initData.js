import { gridW, gridH } from './utils'

// 元素初始化默认样式
const initStyle = {
  baseElem: {
    width: gridW * 8,
    height: gridH * 2,
    fontSize: 14,
    fontWeight: 'normal',
    borderWidth: 0,
    borderColor: '#000',
    borderRadius: 0,
    color: '#000',
    // 根据drop位置初始化
    top: 0,
    left: 0
  },
  customComponent: {
    width: gridW * 46,
    height: gridH * 2,
    fontSize: 14,
    fontWeight: 'normal',
    borderWidth: 0,
    borderColor: '#000',
    borderRadius: 0,
    color: '#000',
    // 根据drop位置初始化
    top: 0,
    left: 0
  },
  image: {
    width: gridW * 6,
    height: gridH * 6,
    fontSize: 14,
    fontWeight: 'normal',
    // 根据drop位置初始化
    top: 0,
    left: 0
  },
  line: {
    zoomGrid: true,
    width: gridW * 46,
    height: 1,
    fontSize: 14,
    fontWeight: 'normal',
    direction: 'vertical',  // horizontal
    background: '#000',
    // borderWidth: 1,
    // 根据drop位置初始化
    top: 0,
    left: 0
  }
}

// 自定义元素
const customElemMap = [
  {
    label: '当前日期',
    id: 'currentDate',
    component: 'customText',
    style: {
      dateFormat: 'YYYY-MM-DD',
      width: gridW * 8,
      height: gridH * 2,
      fontSize: 14,
      fontWeight: 'normal',
      borderWidth: 0,
      borderColor: '#000',
      background: '#ffffff',
      borderRadius: 0,
      color: '#000',
      // 根据drop位置初始化
      top: 0,
      left: 0
    }
  },
  {
    label: '文本',
    id: 'customText',
    component: 'customText',
    style: {
      width: gridW * 8,
      height: gridH * 2,
      fontSize: 14,
      fontWeight: 'normal',
      borderWidth: 0,
      borderColor: '#000',
      background: '#ffffff',
      borderRadius: 0,
      color: '#000',
      // 根据drop位置初始化
      top: 0,
      left: 0
    }
  },
  {
    label: '图片',
    id: 'image',
    component: 'image',
    style: {
      width: gridW * 6,
      height: gridH * 6,
      fontSize: 14,
      fontWeight: 'normal',
      // 根据drop位置初始化
      top: 0,
      left: 0
    }
  },
  {
    label: '线段',
    id: 'line',
    component: 'line',
    style: {
      width: gridW * 46,
      height: gridH,
      fontSize: 14,
      fontWeight: 'normal',
      direction: 'vertical',  // horizontal
      borderColor: '#fff',
      borderWidth: 1,
      // 根据drop位置初始化
      top: 0,
      left: 0
    }
  },
  {
    label: '分页符',
    id: 'pageLine',
    component: 'line',
    style: {
      width: gridW * 46,
      height: gridH,
      fontSize: 14,
      fontWeight: 'normal',
      // 根据drop位置初始化
      top: 0,
      left: 0
    }
  }
]

const elemMap = [{ title: '基本元素', elems: [] }, { title: '自定义元素', elems: customElemMap }]

export { initStyle, elemMap }
