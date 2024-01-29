import React, { useState, useEffect } from 'react'
import { reportConfigStore } from './model'
import { DeleteOutlined, FileOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { gridH, gridW, canvasHeight, canvasWidth } from './utils'
import Zoom from './ElemZoom'
import { cloneDeep } from 'lodash'
import Grid from './Grid'

const CanvasArea = () => {
  const { configElemsList, addedElem, totalPage, updateState } = reportConfigStore()

  const onDragOver = (e) => {
    e.preventDefault()
  }
  const onDrop = e => {
    e.preventDefault()
    e.stopPropagation()
    const rectInfo = document.getElementsByClassName('canvasArea')[0].getBoundingClientRect()
    const elem = cloneDeep(addedElem)
    const list = cloneDeep(configElemsList)
    // 就近吸附到网格线上
    elem.style.top = Math.floor((e.clientY - rectInfo.y) / gridH) * gridH
    elem.style.left = Math.floor((e.clientX - rectInfo.x) / gridW) * gridW
    list.push(elem)
    updateState({ setConfigElemsList: list, setAddedElem: '' })
  }

  const delPage = () => {
    const curPage = totalPage - 1
    const list = configElemsList.filter(elem => elem.style.top < canvasHeight * curPage)
    updateState({
      setTotalPage: curPage < 1 ? 1 : curPage,
      setConfigElemsList: list,
      setCurSelectedElemIndex: ''
    })
  }

  return <div
    className='canvasArea'
    onDrop={onDrop}
    onDragOver={onDragOver}
    style={{
      height: canvasHeight * totalPage,
      minHeight: canvasHeight,
      width: canvasWidth
    }}
  >
    <Grid />
    {configElemsList.map((item, index) => <Zoom pageNum={totalPage} key={index} item={item} index={index} />)}
    <div className='pageButton'>
      <Button icon={<FileOutlined />} onClick={() => { updateState({ setTotalPage: totalPage + 1 }) }}>增加页</Button>
      <Button icon={<DeleteOutlined />} onClick={delPage}>删除页</Button>
    </div>
    <div className='pageNumMask'>
      {new Array(totalPage).fill(true).map((v, i) => <i style={{ top: i * canvasHeight }}></i>)}
    </div>
  </div >
}

export default CanvasArea
