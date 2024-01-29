import React from 'react';
import { render } from 'react-dom';
//import { ReportConfig } from 'visual-config-report'
import { ReportConfig } from '../components/index';
import './report.less'
import { mockReportData } from './initConfig'

let baseElems = [
  {
    "id": "deptCode",
    "label": "单位(实验室)编码",
    "component": "baseText",
    "dynamic": false,
    "style": null
  },
  {
    "id": "deptName",
    "label": "单位(实验室)名称",
    "component": "baseText",
    "dynamic": false,
    "style": null
  },
  {
    "id": "activityName",
    "label": "计划名称",
    "component": "baseText",
    "dynamic": false,
    "style": null
  },
  {
    "id": "programCode",
    "label": "计划编码",
    "component": "baseText",
    "dynamic": false,
    "style": null
  },
  {
    "id": "batchNum",
    "label": "质评轮次",
    "component": "baseText",
    "dynamic": false,
    "style": null
  },
  {
    "id": "responsibleDepartment",
    "label": "负责科室",
    "component": "baseText",
    "dynamic": false,
    "style": null
  },
  {
    "id": "contact",
    "label": "联系电话",
    "component": "baseText",
    "dynamic": false,
    "style": null
  },
  {
    "id": "ownerOrganName",
    "label": "账号所属机构",
    "component": "baseText",
    "dynamic": false,
    "style": null
  },
  {
    "id": "ownerDeptName",
    "label": "账号所属科室",
    "component": "baseText",
    "dynamic": false,
    "style": null
  },
  {
    "id": "labDate",
    "label": "测定日期",
    "component": "baseText",
    "dynamic": false,
    "style": null
  },
  {
    "id": "reportDate",
    "label": "统计日期",
    "component": "baseText",
    "dynamic": false,
    "style": null
  },
  {
    "id": "roomplanYear",
    "label": "统计年份",
    "component": "baseText",
    "dynamic": false,
    "style": null
  },
  {
    "id": "totalScore",
    "label": "总成绩",
    "component": "baseText",
    "dynamic": false,
    "style": null
  },
  {
    "id": "descBox",
    "label": "报告头信息",
    "component": "customComponent",
    "dynamic": false,
    "style": null
  },
  {
    "id": "itemTable#PHEPHE",
    "label": "PHE",
    "component": "customComponent",
    "dynamic": true,
    "style": null
  },
  {
    "id": "itemTable#TSHTSH",
    "label": "TSH",
    "component": "customComponent",
    "dynamic": true,
    "style": null
  },
  {
    "id": "itemTable#17_Α_OHP17_Α_OHP",
    "label": "17_Α_OHP",
    "component": "customComponent",
    "dynamic": true,
    "style": null
  },
  {
    "id": "itemTable#G6PDG6PD",
    "label": "G6PD",
    "component": "customComponent",
    "dynamic": true,
    "style": null
  },
  {
    "id": "itemTable#MSMS",
    "label": "MSMS",
    "component": "customComponent",
    "dynamic": true,
    "style": null
  }
]
const reportTypeList = [
  { value: '新筛-室间质评计划报告', key: 'XS' },
  { value: '产筛-室间质评计划报告', key: 'CS' },
  { value: '核筛-室间质评计划报告', key: 'HX' }
]
const data = [
  {
    "id": "overallEvaluationTable",
    "label": "总评价表",
    "component": "customComponent",
    "dynamic": true,
    "style": {
      "borderColor": "#000",
      "borderRadius": 0,
      "color": "#000",
      "top": 15,
      "left": 31,
      "borderWidth": 0,
      "width": 660,
      "fontSize": 14,
      "fontWeight": "normal",
      "height": 30
    }
  },
  {
    "id": "item#61#expectedDescriptionTable",
    "label": "PHE-PHE预期描述表",
    "component": "customComponent",
    "dynamic": true,
    "style": {
      "borderColor": "#000",
      "borderRadius": 0,
      "color": "#000",
      "top": 45,
      "left": 30,
      "borderWidth": 0,
      "width": 660,
      "fontSize": 14,
      "fontWeight": "normal",
      "height": 30
    }
  },
  {
    "id": "overallEvaluationTable",
    "label": "总评价表",
    "component": "customComponent",
    "dynamic": true,
    "style": {
      "borderColor": "#000",
      "borderRadius": 0,
      "color": "#000",
      "top": 15,
      "left": 31,
      "borderWidth": 0,
      "width": 660,
      "fontSize": 14,
      "fontWeight": "normal",
      "height": 30
    }
  },
  {
    "id": "item#61#expectedDescriptionTable",
    "label": "PHE-PHE预期描述表",
    "component": "customComponent",
    "dynamic": true,
    "style": {
      "borderColor": "#000",
      "borderRadius": 0,
      "color": "#000",
      "top": 45,
      "left": 30,
      "borderWidth": 0,
      "width": 660,
      "fontSize": 14,
      "fontWeight": "normal",
      "height": 30
    }
  },
  {
    "id": "item#61#concentrationTable",
    "label": "PHE-PHE浓度统计表",
    "component": "customComponent",
    "dynamic": true,
    "style": {
      "borderColor": "#000",
      "color": "#000",
      "textAlign": "left",
      "isFloat": false,
      "borderRadius": 0,
      "top": 45,
      "left": 1,
      "borderWidth": 0,
      "background": "#ffffff",
      "width": 690,
      "fontSize": 14,
      "fontWeight": "normal",
      "height": 30
    }
  },
  {
    "id": "item#61#positiveTable",
    "label": "PHE-PHE阴阳性统计表",
    "component": "customComponent",
    "dynamic": true,
    "style": {
      "borderColor": "#000",
      "color": "#000",
      "textAlign": "left",
      "isFloat": false,
      "borderRadius": 0,
      "top": 1215,
      "left": 1,
      "borderWidth": 0,
      "background": "#ffffff",
      "width": 690,
      "fontSize": 14,
      "fontWeight": "normal",
      "height": 30
    }
  },
  {
    "id": "item#61#concentrationTable",
    "label": "PHE-PHE浓度统计表",
    "component": "customComponent",
    "dynamic": true,
    "style": {
      "borderColor": "#000",
      "color": "#000",
      "textAlign": "left",
      "isFloat": false,
      "borderRadius": 0,
      "top": 45,
      "left": 1,
      "borderWidth": 0,
      "background": "#ffffff",
      "width": 690,
      "fontSize": 14,
      "fontWeight": "normal",
      "height": 30
    }
  },
  {
    "id": "item#61#positiveTable",
    "label": "PHE-PHE阴阳性统计表",
    "component": "customComponent",
    "dynamic": true,
    "style": {
      "borderColor": "#000",
      "color": "#000",
      "textAlign": "left",
      "isFloat": false,
      "borderRadius": 0,
      "top": 1215,
      "left": 1,
      "borderWidth": 0,
      "background": "#ffffff",
      "width": 690,
      "fontSize": 14,
      "fontWeight": "normal",
      "height": 30
    }
  },
  {
    "id": "currentDate",
    "label": "当前日期",
    "component": "customText",
    "dynamic": null,
    "style": {
      "borderColor": "#000",
      "borderRadius": 0,
      "color": "#000",
      "top": 90,
      "left": 0,
      "borderWidth": 0,
      "width": 120,
      "fontSize": 14,
      "isFloat": true,
      "fontWeight": "normal",
      "height": 30
    }
  },
  {
    "id": "customText",
    "label": "文本",
    "component": "customText",
    "dynamic": null,
    "style": {
      "borderColor": "#000",
      "borderRadius": 0,
      "color": "#000",
      "top": 90,
      "left": 210,
      "borderWidth": 0,
      "width": 120,
      "fontSize": 14,
      "fontWeight": "normal",
      "height": 30
    }
  }
]

const elemStyle = {
  border: '0 solid',
  boxSizing: 'border-box'
}
// 渲染自定义配置组件
export const renderCustomComponent = (reportData, elem) => {
  const { style } = elem
  const renderRoomResultList = (item, msms = '') => {
    const isShowScore = sessionStorage.getItem('isShowScore') === '1'
    const props = msms ? { className: 'itemWrap' } : { className: 'itemWrap reportElem', style: style }
    const renderSD = (row) => {
      const { range, roomResult } = row
      // 靶值到上/下限的实际距离
      const distance = 51
      // 计算上下限
      const rangeArr = range.split('~')
      const center = (Number(rangeArr[1]) + Number(rangeArr[0])) / 2
      const limit = (rangeArr[1] - center) / center
      const nsd = (roomResult - center) / center
      // console.log(nsd, center, limit)

      if (nsd > limit) {
        return 70
      } else if (nsd < -limit) {
        return -32
      } else {
        return 19 + (distance / limit) * nsd
      }
    }
    return <div {...props}>
      <div style={{ borderBottom: '1px solid #cac4c4' }}>
        <h5>项目：<em>{item.itemName}</em><span>{item.unit}</span></h5>
        <table>
          <tr>
            <th>样本编号</th>
            <th>你室结果</th>
            <th>靶值</th>
            <th width={60}>偏移(%)</th>
            <th width={120}>允许范围</th>
            <th width={46}>下限</th>
            <th width={47}>靶值</th>
            <th width={46}>上限</th>
            {isShowScore ? <th>评价分数</th> : null}
            <th>评价结果</th>
          </tr>
          {item.roomResultList?.map((row, key) => {
            return (
              <tr key={key}>
                <td>{row.roomDataLevel}</td>
                <td>{(row.roomResult || 0).toFixed(2)}</td>
                <td>{(row.roomX || 0).toFixed(2)}</td>
                <td>{row.offset || ''}</td>
                <td>{row.range}</td>
                <td className='rangeLine' />
                <td className='rangeLine roomSd'>
                  <i style={{ left: renderSD(row) }}>*</i>
                </td>
                <td className='rangeLine' />
                {isShowScore ? <td>{row.score}</td> : null}
                <td>{row.evaluateResult}</td>
              </tr>
            )
          })}
        </table>
      </div>
    </div>
  }
  const renderPlanList = (item) => {
    return <div className='itemWrap reportElem' style={style}>
      <div>
        <h5>项目：<em>{item.itemName}</em><span>(阴阳性)</span></h5>
        <table>
          <tr>
            <th>样本编号</th>
            <th>你室结果编码</th>
            <th>你室结果</th>
            <th>正确结果编码</th>
            <th>正确结果</th>
            <th>评价结果</th>
          </tr>
          {item.planStatisticsDtoList?.map((row, key) => {
            return (
              <tr key={key}>
                <td>{row.roomDataLevel}</td>
                <td>{row.conclusionCode}</td>
                <td>{row.conclusionResult}</td>
                <td>{row.correctCode ? row.correctCode : '-'}</td>
                <td>{row.correctResult ? row.correctResult : '-'}</td>
                <td>{row.evaluateResult ? row.evaluateResult : '-'}</td>
              </tr>
            )
          })}
        </table>
      </div>
    </div>
  }
  const renderDescList = (item, msms = '') => {
    const props = msms ? { className: 'itemWrap' } : { className: 'itemWrap reportElem', style: style }
    const renderStatus = (status) => {
      switch (status) {
        case -1:
          return '不通过'
        case 1:
          return '通过'
        default:
          return ''
      }
    }
    return <div {...props}>
      <table>
        <tr className='tableHeader'>
          <th>指标</th>
          <th>样本编号</th>
          <th width={200}>你室描述</th>
          <th width={200}>预期描述</th>
          <th>得分</th>
          <th>评价结果</th>
        </tr>
        {item.describeList?.map((row, j) => {
          return (
            <tr key={j}>
              <td>{row.targetName}</td>
              <td>{row.roomDataLevel}</td>
              <td >{row.roomDescribe}</td>
              <td >{row.expectedValue}</td>
              <td>{row.remark}</td>
              <td>{renderStatus(row.status)}</td>
            </tr>
          )
        })}
      </table>
    </div>
  }
  const renderScoreList = (data) => {
    return <div className="itemWrap reportElem" style={style}>
      <table>
        <tr className='tableHeader'>
          <th width={100}>项目</th>
          <th width={100}>成绩</th>
          <th width={100}>等级</th>
          <th width={100}>评价</th>
        </tr>
        {data?.map((row, j) => {
          return (
            <tr key={j}>
              <td>{row.targetName}</td>
              <td >{row.grade}</td>
              <td >{row.level}</td>
              <td>{row.evaluation}</td>
            </tr>
          )
        })}
      </table>
    </div>
  }
  const renderItemDetail = (field, item) => {
    // 渲染指标table   渲染指标其他数据
    switch (field) {
      case 'concentrationTable':
        return renderRoomResultList(item)
      case 'positiveTable':
        return renderPlanList(item)
      case 'expectedDescriptionTable':
        return renderDescList(item)
      default:
        return <div className='reportElem' style={{ ...elemStyle, ...style }}>
          {item[field]}
        </div>
    }
  }
  // 自定义组件宽高需要渲染完获取
  let renderedComp = ''
  if (elem.id.includes('item#')) {
    const itemData = reportData.reportDetailList.filter(v => elem.id.split('#')[1] === String(v.itemId))
    renderedComp = itemData.map((item, i) => {
      // msms
      if (item.itemName === 'MSMS') {
        return <div className='reportElem' key={i} style={style}>
          {item.list.map(msmsItem => msmsItem.itemQualityResultStatisticalMethod === 1
            ? renderRoomResultList(msmsItem, 'msms')
            : renderDescList(msmsItem, 'msms')
          )}
        </div>
      }
      // hx新产晒cma
      const field = elem.id.split('#')[2]
      return renderItemDetail(field, item)
    })
  } else if (elem.id.includes('fmark')) {
    const value = reportData[elem.id] ? JSON.parse(reportData[elem.id]) : ''
    renderedComp = <div className='reportElem' style={{ border: '0 solid', lineHeight: style.height + 'px', ...style }}>
      {value instanceof Array ? value.join(',') : value}
    </div>
  } else if (elem.id === 'overallEvaluationTable') {
    return renderScoreList(reportData.overallEvaluationTableList)
  } else if (elem.id === 'pageLine') {
    renderedComp = <span className='pageLine' />
  } else {
    renderedComp = ''
  }
  return renderedComp
}
const gridH = 15
// 渲染报告前操作  这里是计算自定义组件高度
export const beforeReportRender = (configList, report) => {
  let addedHeight = 0
  const dynamicIndex = configList.findIndex(elem => elem.dynamic)
  configList.forEach((elem, i) => {
    if (i > dynamicIndex) {
      // 动态元素之后的都要调整自身top
      elem.style.top = elem.style.top + addedHeight
    }
    // 指标相关table
    const itemData = report.reportDetailList.find(v => elem.id.split('#')[1] === String(v.itemId))
    if (itemData && elem.dynamic) {
      // 自身是动态计算的高度的  自身height需要修改
      // 动态计算指标table高度
      // MSMS行数算所有指标table总和数
      let itemHeight = 0
      const tableHeader = 66  // table表头加padding
      const decTableHeader = 25
      const tableRowHeight = 30
      if (itemData.itemName === 'MSMS') {
        const tableNum = itemData.list.reduce((total, current) => total + current[current.itemQualityResultStatisticalMethod === 1 ? 'roomResultList' : 'describeList'].length, 0)
        itemHeight = (itemData.list[0].itemQualityResultStatisticalMethod === 1 ? tableHeader : decTableHeader) * itemData.list.length + tableNum * tableRowHeight
      } else {
        if (elem.id.split('#')[2] === 'concentrationTable') {
          itemHeight = tableHeader + (itemData.roomResultList?.length || 0) * tableRowHeight
          itemHeight = Math.ceil(itemHeight / gridH) * gridH
        }
        if (elem.id.split('#')[2] === 'positiveTable') {
          itemHeight = tableHeader + (itemData.planStatisticsDtoList?.length || 0) * tableRowHeight
          itemHeight = Math.ceil(itemHeight / gridH) * gridH
        }
        if (elem.id.split('#')[2] === 'expectedDescriptionTable') {
          itemHeight = decTableHeader + (itemData.describeList?.length || 0) * tableRowHeight
        }
      }
      addedHeight = itemHeight - elem.style.height + addedHeight
      elem.style.height = itemHeight
    }
    // 总评价table
    if (elem.id === 'overallEvaluationTable' && elem.dynamic) {
      let itemHeight = 0
      const evaTableHeader = 25
      const tableRowHeight = 30
      itemHeight = evaTableHeader + (report.overallEvaluationTableList?.length || 0) * tableRowHeight
      addedHeight = itemHeight - elem.style.height + addedHeight
      elem.style.height = itemHeight
    }
  })
  return configList
}

render(
  <ReportConfig
    onTable={true}
    //AddElems={() => BackupField(getBaseELem)}
    reportTypeList={reportTypeList}
    baseElems={baseElems}
    totalPage={2}
    configElemsList={data}
    defaultElemsList={[]}
    onSaveReportConfig={() => { }}
    mockReportData={mockReportData}
    renderCustomComponent={renderCustomComponent}
    beforeReportRender={beforeReportRender}
  />,
  document.getElementById('root'));



