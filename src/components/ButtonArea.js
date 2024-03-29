import React, { useState } from 'react'
import { Button, Modal, message } from 'antd'
import { reportConfigStore } from "./model";
import ReportHtmlModel from './ReportHtmlModel'

const ButtonArea = ({ reportType, mockReportData, renderCustomComponent, onSaveReportConfig, beforeReportRender, onTable }) => {
  const { defaultElemsList, configElemsList, totalPage, updateState } = reportConfigStore()
  const [previewVisible, setPreviewVisible] = useState(false)

  const onReset = () => {
    Modal.confirm({
      title: '重置页面',
      content: '重置页面将初始化所有配置，确认重置么？',
      cancelText: '取消',
      okText: '确定',
      width: 325,
      onOk: () => {
        updateState({ setConfigElemsList: defaultElemsList, setCurSelectedElemIndex: '' })
      }
    })
  }

  const onSubmitConfig = () => {
    onSaveReportConfig({ elements: configElemsList, type: reportType, totalPage }).then(res => {
      if (res && res.code === 0) {
        message.success('保存成功')
        setPreviewVisible(false)
      }
    })
  }

  return <div className='buttonArea'>
    <Button onClick={onReset}>重置</Button>
    <Button onClick={onSubmitConfig} type='primary' ghost>仅保存</Button>
    <Button onClick={() => setPreviewVisible(true)} type='primary'>预览并保存</Button>
    <Modal
      title={'预览并保存'}
      visible={previewVisible}
      maskClosable={false}
      destroyOnClose
      onCancel={() => setPreviewVisible(false)}
      onOk={onSubmitConfig}
      width={1000}
      centered
      className='adapt-modal configReportPreviewModal'
      wrapClassName='adapt-modal-wrap'
      bodyStyle={{ height: 'calc(100% - 94px)', padding: '0 155px' }}
      okText='确定'
      cancelText='取消'
    >
      <ReportHtmlModel
        onTable={onTable}
        reportsData={mockReportData}
        reportConfigedElems={configElemsList}
        renderCustomComponent={renderCustomComponent}
        beforeReportRender={beforeReportRender}
      // afterReportRender={() => { }}
      />
    </Modal>
  </div>
}

export default ButtonArea
