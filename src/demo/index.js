import React, { useState } from 'react';
import { render } from 'react-dom';
//import { ReportConfig } from 'visual-config-report'
// import { ReportConfig } from '../components/index';
import { ReportConfig } from '../../dist/visualreportconfig';

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
  { label: '新筛-室间质评计划报告', value: 'XS' },
  { label: '产筛-室间质评计划报告', value: 'CS' },
  { label: '核筛-室间质评计划报告', value: 'HX' }
]

const data = [
  {
    "id": "labDate",
    "label": "测定日期",
    "component": "baseText",
    "dynamic": false,
    "style": {
      "borderColor": "#000",
      "color": "#000",
      "textAlign": "center",
      "isFloat": false,
      "justifyContent": "center",
      "borderRadius": 0,
      "top": 1005,
      "left": 0,
      "borderWidth": 0,
      "background": "#ffffff",
      "width": 690,
      "fontSize": 14,
      "fontWeight": "normal",
      "height": 30
    }
  },
  {
    "id": "image",
    "label": "图片",
    "component": "image",
    "dynamic": null,
    "style": {
      "top": 1050,
      "left": 0,
      "borderWidth": 0,
      "imageFile": "",
      "width": 75,
      "isFloat": true,
      "height": 75
    }
  },
  {
    "id": "customText",
    "label": "所属组：",
    "component": "customText",
    "dynamic": null,
    "style": {
      "borderColor": "#000",
      "borderRadius": 0,
      "color": "#000",
      "top": 1215,
      "left": 0,
      "textAlign": "left",
      "borderWidth": 0,
      "width": 105,
      "fontSize": 14,
      "isFloat": false,
      "fontWeight": "normal",
      "height": 30
    }
  },
  {
    "id": "customText",
    "label": "本组实验室数：",
    "component": "customText",
    "dynamic": null,
    "style": {
      "borderColor": "#000",
      "borderRadius": 0,
      "color": "#000",
      "top": 1245,
      "left": 0,
      "textAlign": "left",
      "borderWidth": 0,
      "width": 105,
      "fontSize": 14,
      "isFloat": false,
      "fontWeight": "normal",
      "height": 30
    }
  },
  {
    "id": "deptName",
    "label": "单位(实验室)名称",
    "component": "baseText",
    "dynamic": false,
    "style": {
      "borderColor": "#000",
      "color": "#000",
      "textAlign": "center",
      "justifyContent": "center",
      "borderRadius": 0,
      "top": 960,
      "left": 0,
      "borderWidth": 0,
      "background": "#ffffff",
      "width": 690,
      "fontSize": 14,
      "fontWeight": "normal",
      "height": 45
    }
  },
  {
    "id": "image",
    "label": "图片",
    "component": "image",
    "dynamic": null,
    "style": {
      "top": 90,
      "left": 240,
      "borderWidth": 0,
      "imageFile": "",
      "width": 180,
      "height": 165
    }
  },
  {
    "id": "customText",
    "label": "年产前遗传代谢病筛查",
    "component": "customText",
    "dynamic": null,
    "style": {
      "borderColor": "#000",
      "borderRadius": 0,
      "color": "#000",
      "top": 285,
      "left": 225,
      "borderWidth": 0,
      "width": 345,
      "fontSize": 30,
      "fontWeight": "bold",
      "height": 45
    }
  },
  {
    "id": "customText",
    "label": "临床检验室间质量评价报告",
    "component": "customText",
    "dynamic": null,
    "style": {
      "borderColor": "#000",
      "borderRadius": 0,
      "color": "#000",
      "top": 345,
      "left": 195,
      "borderWidth": 0,
      "width": 300,
      "fontSize": 24,
      "fontWeight": "bold",
      "height": 30
    }
  },
  {
    "id": "batchNum",
    "label": "质评轮次",
    "component": "baseText",
    "dynamic": false,
    "style": {
      "borderColor": "#000",
      "borderRadius": 0,
      "color": "#000",
      "top": 705,
      "left": 240,
      "textAlign": "left",
      "borderWidth": 0,
      "width": 330,
      "fontSize": 20,
      "fontWeight": "normal",
      "height": 30
    }
  },
  {
    "id": "customText",
    "label": "计划编码：",
    "component": "customText",
    "dynamic": null,
    "style": {
      "borderColor": "#000",
      "borderRadius": 0,
      "color": "#000",
      "top": 645,
      "left": 60,
      "textAlign": "left",
      "borderWidth": 0,
      "width": 120,
      "fontSize": 20,
      "fontWeight": "normal",
      "height": 30
    }
  },
  {
    "id": "customText",
    "label": "计划名称：",
    "component": "customText",
    "dynamic": null,
    "style": {
      "borderColor": "#000",
      "borderRadius": 0,
      "color": "#000",
      "top": 585,
      "left": 61,
      "textAlign": "left",
      "borderWidth": 0,
      "width": 120,
      "fontSize": 20,
      "isFloat": false,
      "fontWeight": "normal",
      "height": 30
    }
  },
  {
    "id": "customText",
    "label": "单位(实验室)编码：",
    "component": "customText",
    "dynamic": null,
    "style": {
      "borderColor": "#000",
      "color": "#000",
      "textAlign": "left",
      "isFloat": false,
      "borderRadius": 0,
      "top": 465,
      "left": 61,
      "borderWidth": 0,
      "background": "#ffffff",
      "width": 180,
      "fontSize": 20,
      "fontWeight": "normal",
      "height": 30
    }
  },
  {
    "id": "customText",
    "label": "单位名称：",
    "component": "customText",
    "dynamic": null,
    "style": {
      "borderColor": "#000",
      "borderRadius": 0,
      "color": "#000",
      "top": 525,
      "left": 60,
      "textAlign": "left",
      "borderWidth": 0,
      "width": 120,
      "fontSize": 20,
      "fontWeight": "normal",
      "height": 30
    }
  },
  {
    "id": "deptCode",
    "label": "单位(实验室)编码",
    "component": "baseText",
    "dynamic": false,
    "style": {
      "borderColor": "#000",
      "borderRadius": 0,
      "color": "#000",
      "top": 465,
      "left": 240,
      "borderWidth": 0,
      "width": 300,
      "fontSize": 20,
      "fontWeight": "normal",
      "height": 30
    }
  },
  {
    "id": "deptName",
    "label": "单位(实验室)名称",
    "component": "baseText",
    "dynamic": false,
    "style": {
      "borderColor": "#000",
      "borderRadius": 0,
      "color": "#000",
      "top": 525,
      "left": 240,
      "borderWidth": 0,
      "width": 315,
      "fontSize": 20,
      "fontWeight": "normal",
      "height": 30
    }
  },
  {
    "id": "programCode",
    "label": "计划编码",
    "component": "baseText",
    "dynamic": false,
    "style": {
      "borderColor": "#000",
      "borderRadius": 0,
      "color": "#000",
      "top": 645,
      "left": 240,
      "borderWidth": 0,
      "width": 330,
      "fontSize": 20,
      "fontWeight": "normal",
      "height": 30
    }
  },
  {
    "id": "activityName",
    "label": "计划名称",
    "component": "baseText",
    "dynamic": false,
    "style": {
      "borderColor": "#000",
      "borderRadius": 0,
      "color": "#000",
      "top": 585,
      "left": 240,
      "borderWidth": 0,
      "width": 330,
      "fontSize": 20,
      "fontWeight": "normal",
      "height": 30
    }
  },
  {
    "id": "customText",
    "label": "质评轮次：",
    "component": "customText",
    "dynamic": null,
    "style": {
      "borderColor": "#000",
      "borderRadius": 0,
      "color": "#000",
      "top": 705,
      "left": 60,
      "borderWidth": 0,
      "width": 120,
      "fontSize": 20,
      "fontWeight": "normal",
      "height": 30
    }
  },
  {
    "id": "customText",
    "label": "你室主任:",
    "component": "customText",
    "dynamic": null,
    "style": {
      "borderColor": "#000",
      "borderRadius": 0,
      "color": "#000",
      "top": 1455,
      "left": 420,
      "borderWidth": 0,
      "width": 75,
      "fontSize": 14,
      "isFloat": true,
      "fontWeight": "normal",
      "height": 30
    }
  },
  {
    "id": "roomplanYear",
    "label": "统计年份",
    "component": "baseText",
    "dynamic": false,
    "style": {
      "borderColor": "#000",
      "borderRadius": 0,
      "color": "#000",
      "top": 285,
      "left": 90,
      "textAlign": "right",
      "borderWidth": 0,
      "width": 135,
      "fontSize": 30,
      "isFloat": true,
      "fontWeight": "bold",
      "height": 45
    }
  },
  {
    "id": "customText",
    "label": "产前疾病筛查/诊断中心",
    "component": "customText",
    "dynamic": null,
    "style": {
      "borderColor": "#000",
      "color": "#000",
      "textAlign": "center",
      "justifyContent": "center",
      "borderRadius": 0,
      "top": 1050,
      "left": 120,
      "borderWidth": 0,
      "background": "#ffffff",
      "width": 450,
      "fontSize": 36,
      "fontWeight": "bold",
      "height": 45
    }
  },
  {
    "id": "currentDate",
    "label": "日期",
    "component": "customText",
    "dynamic": null,
    "style": {
      "borderColor": "#000",
      "color": "#000",
      "dateFormat": "YYYY",
      "isFloat": false,
      "justifyContent": "right",
      "borderRadius": 0,
      "top": 1095,
      "left": 120,
      "borderWidth": 0,
      "width": 45,
      "fontSize": 16,
      "fontWeight": "normal",
      "height": 30
    }
  },
  {
    "id": "customText",
    "label": "年产前遗传代谢病筛查室间质评统计结果",
    "component": "customText",
    "dynamic": null,
    "style": {
      "borderColor": "#000",
      "borderRadius": 0,
      "color": "#000",
      "top": 1095,
      "left": 165,
      "borderWidth": 0,
      "width": 480,
      "fontSize": 16,
      "fontWeight": "normal",
      "height": 30
    }
  },
  {
    "id": "line",
    "label": "线段",
    "component": "line",
    "dynamic": null,
    "style": {
      "top": 1470,
      "left": 495,
      "zoomGrid": true,
      "background": "#000",
      "borderWidth": 0,
      "width": 150,
      "isFloat": true,
      "height": 1,
      "direction": "vertical"
    }
  },
  {
    "id": "line",
    "label": "线段",
    "component": "line",
    "dynamic": null,
    "style": {
      "top": 1515,
      "left": 495,
      "zoomGrid": true,
      "background": "#000",
      "borderWidth": 0,
      "width": 150,
      "isFloat": true,
      "height": 1,
      "direction": "vertical"
    }
  },
  {
    "id": "customText",
    "label": "专家签字：",
    "component": "customText",
    "dynamic": null,
    "style": {
      "borderColor": "#000",
      "borderRadius": 0,
      "color": "#000",
      "top": 1500,
      "left": 420,
      "borderWidth": 0,
      "width": 75,
      "fontSize": 14,
      "isFloat": true,
      "fontWeight": "normal",
      "height": 30
    }
  },
  {
    "id": "deptName",
    "label": "单位(实验室)名称",
    "component": "baseText",
    "dynamic": false,
    "style": {
      "borderColor": "#000",
      "borderRadius": 0,
      "color": "#000",
      "top": 1125,
      "left": 105,
      "borderWidth": 0,
      "width": 195,
      "fontSize": 14,
      "fontWeight": "normal",
      "justifyContent": "left",
      "height": 30
    }
  },
  {
    "id": "customText",
    "label": "",
    "component": "customText",
    "dynamic": null,
    "style": {
      "borderColor": "#000000",
      "borderRadius": 0,
      "color": "#000",
      "top": 1125,
      "left": 1,
      "borderWidth": 1,
      "width": 690,
      "fontSize": 14,
      "isFloat": true,
      "fontWeight": "normal",
      "height": 30
    }
  },
  {
    "id": "customText",
    "label": "实验室名称：",
    "component": "customText",
    "dynamic": null,
    "style": {
      "borderColor": "#000",
      "borderRadius": 0,
      "color": "#000",
      "top": 1125,
      "left": 15,
      "borderWidth": 0,
      "width": 90,
      "fontSize": 14,
      "fontWeight": "normal",
      "justifyContent": "right",
      "height": 30
    }
  },
  {
    "id": "labDate",
    "label": "测定日期",
    "component": "baseText",
    "dynamic": false,
    "style": {
      "borderColor": "#000",
      "borderRadius": 0,
      "color": "#000",
      "top": 1125,
      "left": 450,
      "borderWidth": 0,
      "width": 210,
      "fontSize": 14,
      "fontWeight": "normal",
      "justifyContent": "left",
      "height": 30
    }
  },
  {
    "id": "customText",
    "label": "测定日期：",
    "component": "customText",
    "dynamic": null,
    "style": {
      "borderColor": "#000",
      "borderRadius": 0,
      "color": "#000",
      "top": 1125,
      "left": 375,
      "borderWidth": 0,
      "width": 75,
      "fontSize": 14,
      "fontWeight": "normal",
      "justifyContent": "right",
      "height": 30
    }
  },
  {
    "id": "item#68#calculateGroupName",
    "label": "CMA-CMA所属组",
    "component": "customComponent",
    "dynamic": false,
    "style": {
      "borderColor": "#000",
      "borderRadius": 0,
      "color": "#000",
      "top": 1215,
      "left": 61,
      "borderWidth": 0,
      "width": 630,
      "fontSize": 14,
      "fontWeight": "normal",
      "height": 30
    }
  },
  {
    "id": "item#68#groupLabNum",
    "label": "CMA-CMA本组实验室数",
    "component": "customComponent",
    "dynamic": false,
    "style": {
      "borderColor": "#000",
      "borderRadius": 0,
      "color": "#000",
      "top": 1245,
      "left": 91,
      "borderWidth": 0,
      "width": 600,
      "fontSize": 14,
      "fontWeight": "normal",
      "height": 30
    }
  },
  {
    "id": "item#68#concentrationTable",
    "label": "CMA-CMA浓度统计表",
    "component": "customComponent",
    "dynamic": true,
    "style": {
      "borderColor": "#000",
      "borderRadius": 0,
      "color": "#000",
      "top": 1155,
      "left": 0,
      "borderWidth": 0,
      "width": 660,
      "fontSize": 14,
      "fontWeight": "normal",
      "height": 30
    }
  },
  {
    "id": "item#68#expectedDescriptionTable",
    "label": "CMA-CMA结果上报",
    "component": "customComponent",
    "dynamic": true,
    "style": {
      "borderColor": "#000",
      "borderRadius": 0,
      "color": "#000",
      "top": 1185,
      "left": 0,
      "borderWidth": 0,
      "width": 660,
      "fontSize": 14,
      "fontWeight": "normal",
      "height": 30
    }
  },
  {
    "id": "item#68#resultsReportAttachment",
    "label": "CMA-CMA结果上报-附件",
    "component": "customComponent",
    "dynamic": true,
    "style": {
      "borderColor": "#000",
      "borderRadius": 0,
      "color": "#000",
      "top": 795,
      "left": 0,
      "borderWidth": 0,
      "width": 660,
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
const gridH = 15

// 渲染自定义配置组件
const renderCustomComponent = (reportData, elem) => {
  const { style } = elem
  // 指标相关自定义table
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
        <table style={{ border: 0 }}>
          <tbody>
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
          </tbody>
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
  const renderReportFileList = (item) => {
    return <div className='itemWrap reportElem' style={style}>
      <table>
        <tr className='tableHeader'>
          <th width={120}>指标</th>
          <th width={100}>样本编号</th>
          <th width={300}>本室描述</th>
        </tr>
        {item.dataAttachmentsList?.map((row, j) => {
          return (
            <tr key={j}>
              <td>{row.itemName}</td>
              <td>{row.level}</td>
              <td >{row.result}</td>
            </tr>
          )
        })}
      </table>
    </div>
  }
  const renderPlanList = (item) => {
    return <div className='itemWrap reportElem' style={style}>
      <div>
        <h5>项目：<em>{item.itemName}</em><span>(阴阳性)</span></h5>
        <table>
          <tbody>
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
          </tbody>
        </table>
      </div>
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
      case 'resultsReportAttachment':
        return renderReportFileList(item)
      default:
        return <div className='reportElem' style={{ ...elemStyle, ...style }}>
          {item[field]}
        </div>
    }
  }

  // 其他自定义table
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
      // hx新产筛cma
      const field = elem.id.split('#')[2]
      return renderItemDetail(field, item)
    })
  } else if (elem.id.includes('fmark')) {
    const value = reportData[elem.id] ? JSON.parse(reportData[elem.id]) : ''
    renderedComp = <div className='reportElem' style={{ border: '0 solid', lineHeight: style.height + 'px', ...style }}>
      {value instanceof Array ? value.join(',') : value}
    </div>
  } else if (elem.id === 'overallEvaluationTable') {
    renderedComp = renderScoreList(reportData.overallEvaluationTableList)
  } else if (elem.id === 'pageLine') {
    renderedComp = <span className='pageLine' />
  } else {
    renderedComp = ''
  }
  return renderedComp
}
// 渲染报告前操作  这里是计算自定义组件高度
const beforeReportRender = (configList, report) => {
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
        if (elem.id.split('#')[2] === 'resultsReportAttachment') {
          itemHeight = decTableHeader + (itemData.dataAttachmentsList?.length || 0) * tableRowHeight
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



const App = () => {
  const [list, setList] = useState([])
  const renderBtns = () => {
    const onReset = () => {
      setList([{
        id: 'labDate',
        label: '测定日期',
        component: 'baseText',
        dynamic: false,
        style: {
          borderColor: '#000',
          color: '#000',
          textAlign: 'center',
          isFloat: false,
          justifyContent: 'center',
          borderRadius: 0,
          top: 1005,
          left: 0,
          borderWidth: 0,
          background: '#ffffff',
          width: 690,
          fontSize: 14,
          fontWeight: 'normal',
          height: 30
        }
      }])
    }
    return <>
      <button onClick={onReset}>重制</button>
    </>
  }
  return <ReportConfig
    onTable={true}
    //AddElems={() => BackupField(getBaseELem)}
    reportTypeList={reportTypeList}
    baseElems={baseElems}
    totalPage={2}
    configElemsList={list}
    mockReportData={mockReportData}
    renderCustomComponent={renderCustomComponent}
    beforeReportRender={beforeReportRender}
    renderBtns={renderBtns}
  />
}

render(
  <App />,
  document.getElementById('root'));



