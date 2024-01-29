import React, { useEffect, useState, useMemo } from 'react'
import { gridH, gridW, canvasWidth, colGridNum } from './utils'
import moment from 'moment'
import { cloneDeep } from 'lodash'

let normalTableObj = {}
let normalRowSpanObj = {}
let floatTableObj = {}
let floatRowSpanObj = {}
let floatRowsLen = 0

const tdStyle = {
  width: gridW,
  height: gridH,
  padding: 0,
  position: 'relative'
}
const baseStyle = {
  width: canvasWidth + 'px',
  padding: '0 0',
  position: 'relative'
}
const elemStyle = {
  border: '0 solid',
  boxSizing: 'border-box'
}

const All = ({ reportsData, reportConfigedElems, renderCustomComponent, afterReportRender, beforeReportRender, onTable }) => {
  const [configElemsList, setConfigElemsList] = useState(reportConfigedElems)
  const wrapStyle = baseStyle

  // 报告获取配置项元素
  useEffect(() => {
    reportConfigedElems && setConfigElemsList(reportConfigedElems)
  }, [reportConfigedElems])
  // 生成报告后操作
  useEffect(() => {
    afterReportRender && setTimeout(afterReportRender, 1000)
  }, [reportsData])

  // 将普通元素数据解析成table数据
  const parseNormalTableData = (elems, reportData) => {
    normalTableObj = {}
    normalRowSpanObj = {}
    elems.forEach((elem, i) => {
      if (elem.style.isFloat) return
      const { top, left, height, width } = elem.style
      // 适配后端生成pdf加粗
      //console.log(elem)
      let elem_ = JSON.parse(JSON.stringify(elem))
      if (elem_.style.fontWeight === 'bold') { elem_.style.fontFamily = 'Source Han Serif SC' }
      const y = Math.round(top / gridH) + 1
      const x = Math.round(left / gridW) + 1
      const ySpan = Math.round(height / gridH) || 1
      const xSpan = Math.round(width / gridW) || 1
      elem_.style.position = 'relative'
      elem_.style.top = 0
      elem_.style.left = 0
      elem_.style.zIndex = 10 //普通元素默认zindex是10
      const obj = { x, y, xSpan, ySpan, content: elemComponent(reportData, elem_) }
      normalTableObj[y] ? normalTableObj[y].push(obj) : normalTableObj[y] = [obj]
    })
    // 每行所有的colSpan
    for (const i in normalTableObj) {
      if (Object.hasOwnProperty.call(normalTableObj, i)) {
        normalTableObj[i].forEach(item => {
          for (let j = 0; j < item.ySpan; j++) {
            normalRowSpanObj[Number(i) + j] = { ...normalRowSpanObj[Number(i) + j], [item.x]: item.xSpan }
          }
        })
      }
    }
  }
  // 将浮动元素数据解析成table数据
  const parseFloatTableData = (elems, reportData) => {
    floatTableObj = {}
    floatRowSpanObj = {}
    elems.forEach((elem, i) => {
      if ((!elem.style.isFloat)) return
      const { top, left, height, width } = elem.style
      // 适配后端生成pdf加粗
      //console.log(elem)
      let elem_ = JSON.parse(JSON.stringify(elem))
      if (elem_.style.fontWeight === 'bold') { elem_.style.fontFamily = 'Source Han Serif SC' }
      const y = Math.round(top / gridH) + 1
      const x = Math.round(left / gridW) + 1
      const ySpan = Math.round(height / gridH) || 1
      const xSpan = Math.round(width / gridW) || 1
      elem_.style.top = 0
      elem_.style.left = 0
      elem_.style.position = 'absolute'
      elem_.style.zIndex = 0 //默认在底层
      const obj = { x, y, xSpan: 1, ySpan, content: elemComponent(reportData, elem_) }
      floatTableObj[y] ? floatTableObj[y].push(obj) : floatTableObj[y] = [obj]
    })
    // 每行所有的colSpan
    for (const i in floatTableObj) {
      if (Object.hasOwnProperty.call(floatTableObj, i)) {
        floatTableObj[i].forEach(item => {
          for (let j = 0; j < item.ySpan; j++) {
            floatRowSpanObj[Number(i) + j] = { ...floatRowSpanObj[Number(i) + j], [item.x]: item.xSpan }
          }
        })
      }
    }
  }

  // 浮动元素和普通元素比较取更大的totalRows
  const getTotalRows = () => {
    const nLastRow = Object.keys(normalTableObj)[Object.keys(normalTableObj).length - 1]
    const nMaxYspan = normalTableObj[nLastRow]?.reduce((c, t) => Math.max(c, t.ySpan), 0)
    const nSum = (Number(nLastRow) + Number(nMaxYspan)) || 0

    const fLastRow = Object.keys(floatTableObj)[Object.keys(floatTableObj).length - 1]
    const fMaxYspan = floatTableObj[fLastRow]?.reduce((c, t) => Math.max(c, t.ySpan), 0)
    const fSum = (Number(fLastRow) + Number(fMaxYspan)) || 0

    return nSum > fSum ? nSum : fSum
  }
  // 转成table布局
  const renderTableLayout = (reportData, elems, isFloat = false) => {
    let tableObj = {}
    let rowSpanObj = {}
    parseNormalTableData(elems, reportData)
    parseFloatTableData(elems, reportData)
    if (isFloat) {
      tableObj = floatTableObj
      rowSpanObj = floatRowSpanObj
    } else {
      tableObj = normalTableObj
      rowSpanObj = normalRowSpanObj
    }
    if (Object.keys(tableObj).length === 0) return null
    const totalRows = getTotalRows()
    const resArr = []
    for (let i = 1; i < totalRows; i++) {
      const rowItems = tableObj[i]
      if (rowItems) {
        rowItems.sort((a, b) => a.x - b.x)
        const rowArr = new Array(colGridNum).fill(true).map((v, i) => <td id={i} style={tdStyle} />)
        // 当前行item替换
        rowItems.forEach((item, i) => {
          const startX = item.x - 1
          rowArr.splice(startX, 1, <td style={tdStyle} colSpan={item.xSpan} rowSpan={item.ySpan}>{item.content}</td>)
        })
        // 删除当前和先前行span
        for (const x in rowSpanObj[i]) {
          if (Object.hasOwnProperty.call(rowSpanObj[i], x)) {
            const xSpan = rowSpanObj[i][x]
            let index = rowArr.findIndex(v => v.props.id === Number(x))
            rowArr.splice(index, xSpan - 1)
          }
        }
        resArr.push(<tr>{rowArr.map(v => v)}</tr>)
      } else {
        resArr.push(<tr><td style={tdStyle} /></tr>)
      }
    }
    return resArr
  }

  // 配置项组件
  const elemComponent = (reportData, elem) => {
    if (elem.component === 'customText') {
      elem.style.lineHeight = elem.style.height + 'px'
      if (elem.id === 'currentDate') {
        elem.label = moment().format(elem.style.dateFormat || 'YYYY-MM-DD')
      }
      return <div className='reportElem' style={{ ...elemStyle, ...elem.style }}>{elem.label}</div>
    } else if (elem.component === 'customComponent') {
      // 自定义组件只有位置生效  样式不采纳
      if (!elem.dynamic) {
        elem.style.lineHeight = elem.style.height + 'px'
      }
      return renderCustomComponent(reportData, elem)
    } else if (elem.component === 'image') {
      return <div className='reportElem' style={{ ...elemStyle, ...elem.style }} src={elem.style.imageFile} >
        <img style={{ width: '100%', height: '100%', objectFit: 'contain' }} className='customImage' src={elem.style.imageFile} />
      </div>
    } else if (elem.id === 'line') {
      return <hr style={{ width: '100%', background: '#000', ...elemStyle }} className='reportElem' style={elem.style} />
    } else if (elem.id === 'pageLine') {
      return <span className='pageLine' style={elem.style} />
    } else {
      elem.style.lineHeight = elem.style.height + 'px'
      return <div className='reportElem' style={{ ...elemStyle, ...elem.style }}>{reportData[elem.id]}</div>
    }
  }

  // 渲染配置项
  const renderConfigElem = (report) => {
    if (!configElemsList.length) return
    const initElemsConfigCopy = cloneDeep(configElemsList)
    initElemsConfigCopy.sort((a, b) => a.style.top - b.style.top)
    let initElemsConfigCopy_ = initElemsConfigCopy
    if (beforeReportRender) {
      initElemsConfigCopy_ = beforeReportRender(initElemsConfigCopy, report)
    }
    // 渲染
    return onTable
      ? <>
        {/* 普通元素图层 */}
        <table style={{ width: '100%', position: 'relative', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
          {renderTableLayout(report, initElemsConfigCopy_)}
        </table>
        {/* 浮动元素图层 */}
        <table style={{ width: '100%', position: 'absolute', left: 0, top: 0, borderCollapse: 'collapse' }}>
          {renderTableLayout(report, initElemsConfigCopy_, true)}
        </table>
      </>
      : initElemsConfigCopy_.map((elem, i) => {
        // 适配后端生成pdf加粗
        if (elem.style.fontWeight === 'bold') { elem.style.fontFamily = 'Source Han Serif SC' }
        elem.style.position = 'absolute'
        return elemComponent(report, elem)
      })
  }

  return (
    <React.Fragment>
      {reportsData.map((report, index) => (
        <div style={wrapStyle} key={index} className={'reportModelWrap'} id={`reportPdf${index}`}>
          {renderConfigElem(report)}
        </div>)
      )}
    </React.Fragment >
  )
}

export default All
