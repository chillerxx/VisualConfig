import React, { useState, useEffect } from 'react'
import { reportConfigStore } from "./model";
import { Modal } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { calcELemPositonAndSize, gridW, gridH, canvasWidth, canvasHeight } from './utils'
import { cloneDeep } from 'lodash'

let itemCopy = null
// 优化渲染
let isUpdate = false
const pointList = ['nw', 'n', 'ne', 'se', 's', 'sw']

const Zoom = ({ item, index, pageNum }) => {
  const { configElemsList, curSelectedElemIndex, addedElem, updateState } = reportConfigStore()
  const [itemData, setItemData] = useState(item)

  useEffect(() => {
    setItemData(item)
  }, [item])

  const onZoomMouseDown = (e) => {
    // 如果没有选中组件 在画布上点击时需要调用 e.preventDefault() 防止触发 drop 事件
    if (!addedElem) {
      e.preventDefault()
    }
    e.stopPropagation()
    updateState({ setCurSelectedElemIndex: index })

    const curElemStyle = itemData.style
    const startY = e.clientY
    const startX = e.clientX
    const startTop = Number(curElemStyle.top)
    const startLeft = Number(curElemStyle.left)

    const move = (moveEvent) => {
      isUpdate = true
      itemCopy = cloneDeep(itemData)
      const style = itemCopy.style
      const curX = moveEvent.clientX
      const curY = moveEvent.clientY
      const moveX = Math.round((curX - startX) / gridW) * gridW
      const moveY = Math.round((curY - startY) / gridH) * gridH
      style.top = validTopLeft(moveY + startTop, style.height, 'top')
      style.left = validTopLeft(moveX + startLeft, style.width, 'left')
      // 更新当前元素位置
      setItemData(itemCopy)
    }
    const up = () => {
      if (isUpdate) {
        const list = cloneDeep(configElemsList)
        list[index] = itemCopy
        updateState({ setConfigElemsList: list })
      }
      isUpdate = false
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
    }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  }
  // 限制移动区域范围
  const validTopLeft = (move, Size, type) => {
    const canvasSize = type === 'top' ? canvasHeight * pageNum : canvasWidth
    let res = move
    if (move > 0) {
      if (move > (canvasSize - Size)) {
        res = canvasSize - Size
      }
    } else {
      res = 0
    }
    return res
  }

  const onPointMouseDown = (point, e) => {
    e.stopPropagation()
    e.preventDefault()

    const downX = e.clientX
    const downY = e.clientY
    const style = itemData.style

    const move = (moveEvent) => {
      if (!isUpdate) {
        itemCopy = cloneDeep(itemData)
      }
      itemCopy = cloneDeep(itemCopy)
      isUpdate = true
      const curPositon = {
        x: moveEvent.clientX - downX,
        y: moveEvent.clientY - downY
      }
      calcELemPositonAndSize(point, style, itemCopy.style, curPositon)
      setItemData(itemCopy)
    }

    const up = () => {
      if (isUpdate) {
        const list = cloneDeep(configElemsList)
        list[index] = itemCopy
        updateState({ setConfigElemsList: list })
      }
      isUpdate = false
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
    }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  }

  const getPointStyle = (point) => {
    const { width, height } = itemData.style
    const hasT = /n/.test(point)
    const hasB = /s/.test(point)
    const hasL = /w/.test(point)
    let newLeft = 0
    let newTop = 0
    // 四个角的点
    if (point.length === 2) {
      newLeft = hasL ? 0 : width
      newTop = hasT ? 0 : height
    } else {
      // 上下两点的点，宽度居中
      if (hasT || hasB) {
        newLeft = width / 2
        newTop = hasT ? 0 : height
      }
    }
    return {
      cursor: point + '-resize',
      left: newLeft,
      top: newTop
    }
  }

  const onDelete = (index) => {
    updateState({ setCurSelectedElemIndex: index })
    Modal.confirm({
      title: '删除元素',
      content: `确定要删除${itemData.label}吗？`,
      cancelText: '取消',
      okText: '确定',
      width: 325,
      onOk: () => {
        const list = cloneDeep(configElemsList)
        list.splice(index, 1)
        updateState({ setConfigElemsList: list, setCurSelectedElemIndex: '' })
      }
    })
  }

  return <div className={`zoomArea ${curSelectedElemIndex === index ? 'curSelectedElem' : ''}`} style={itemData.style} onDoubleClick={() => updateState({ setCurEditElem: { itemData, index } })}>
    {curSelectedElemIndex === index
      ? pointList.map(point => <i className='zoomPonit' style={getPointStyle(point)} onMouseDown={(e) => onPointMouseDown(point, e)} />)
      : ''
    }
    <div className='configedElem' onMouseDown={onZoomMouseDown} style={itemData.style} key={itemData.id} >
      {itemData.id === 'line' ? '' : itemData.label}
    </div>
    <DeleteOutlined onClick={() => onDelete(index)} />
  </div>
}

export default Zoom
