import React, { useState, useEffect } from 'react'
import { Select, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import CanvasArea from './CanvasArea'
import ButtonArea from './ButtonArea'
import ElemEditDrawer from './ElemEditDrawer'
import { canvasWidth } from './utils'
import { initStyle, elemMap } from './initData'
import { reportConfigStore } from "./model"
import './index.less'

const Option = Select.Option

const App = ({ renderBtns, renderPreview, AddElems, reportTypeList, totalPage, configElemsList, defaultElemsList, baseElems, onTable,
  onChangeReportType, onSaveReportConfig, renderCustomComponent, beforeReportRender, mockReportData }) => {
  const { updateState } = reportConfigStore()
  const [elemList, setElemList] = useState([])
  const [reportType, setReportType] = useState()

  // 初始化查询
  useEffect(() => {
    setReportType(reportTypeList && reportTypeList[0].key || '')
  }, [])

  // 切换页面 修改传入的configList
  useEffect(() => {
    onChangeReportType && onChangeReportType(reportType)
  }, [reportType])

  useEffect(() => {
    let obj = defaultElemsList
    if (configElemsList.length) { obj = configElemsList }
    updateState({ setDefaultElemsList: defaultElemsList, setConfigElemsList: obj })
  }, [configElemsList, defaultElemsList])
  useEffect(() => {
    elemMap[0].elems = baseElems
    setElemList([...elemMap])
  }, [baseElems])
  useEffect(() => {
    updateState({ setTotalPage: totalPage })
  }, [totalPage])

  const onDragStart = (elem) => {
    updateState({ setAddedElem: elem })
  }

  // 渲染左侧元素池
  const initElemArea = () => {
    return elemList.map(item => <React.Fragment>
      <h4>{item.title}</h4>
      <div className='elemWrap'>
        {item.elems.map(elem => {
          const style = initStyle[elem.component]
          if (style) {
            elem.style = style
          } else {
            elem.style = initStyle.baseElem
          }
          return <div key={elem.id} draggable onDragStart={() => onDragStart(elem)}>
            {elem.label}
          </div>
        })}
      </div>
    </React.Fragment>)
  }

  const onChangeReport = (e) => {
    Modal.confirm({
      title: '切换后将清空未保存内容，如存在未保存内容请先保存，是否继续切换？',
      cancelText: '取消',
      okText: '确定',
      onOk: () => {
        setReportType(e)
      }
    })
  }

  return (
    <div className='indexContainer'>
      <section className='leftArea'>
        选择页面：
        <Select placeholder='请选择' onChange={onChangeReport} value={reportType}>
          {reportTypeList.map((item, index) => {
            return (
              <Option key={index} value={item.key}>
                {item.value}
              </Option>
            )
          })}
        </Select>
        <div className='elemsArea'>
          {elemList.length && AddElems ? <AddElems /> : null}
          {initElemArea()}
        </div>
      </section>
      <section className='rightArea'>
        <div style={{ paddingLeft: `calc(50% - ${canvasWidth / 2}px)` }} className='configArea'>
          <h4 style={{ width: canvasWidth }}>元素配置</h4>
          <div style={{ width: canvasWidth }} className='infoRow'><ExclamationCircleOutlined />你可以通过拖拽元素池中的组件来自定义界面</div>
          <CanvasArea />
          <ElemEditDrawer />
        </div>
        <ButtonArea
          renderBtns={renderBtns}
          renderPreview={renderPreview}
          onTable={onTable}
          reportType={reportType}
          onSaveReportConfig={onSaveReportConfig}
          renderCustomComponent={renderCustomComponent}
          beforeReportRender={beforeReportRender}
          mockReportData={mockReportData}
        />
      </section>
    </div >
  )
}

export default App
