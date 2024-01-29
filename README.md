# visual-config-report 可视化报告配置组件


## 介绍

基于 react hook + hox 可视化配置报告元素，包括元素的拖拽、缩放、编辑等功能

- 元素添加&画布区域内拖拽
- 元素大小缩放
- 元素样式编辑

## 使用说明
### 安装依赖

```
npm i visual-config-report
```

### 使用

```text
暴露两个组件 
<ReportConfig/>  配置页面
<ReportHtmlModel/>  预览已配置报告
className=indexContainer 是ReportConfig的外容器  最好设置固定高度 可滚动
存在自定义组件的  可外部自行添加样式 
```

```jsx
import React from 'react';
import { render } from 'react-dom';
import { ReportConfig, ReportHtmlModel } from 'visual-config-report';

const App = ()=>{
  return (
    <ReportConfig
      reportTypeList={[]}
      onChangeReportType={() => { }}
      baseElems={[]}
      totalPage={''}
      configElemsList={[]}
      defaultElemsList={[]}
      mockReportData={[]}
      onSaveReportConfig={() => { }}
      
      renderCustomComponent={()=>{ }}
      beforeReportRender={()=>{ }}
      afterReportRender={() => { }}
  />    
  )
}

const previewReport = ()=>{
  return (
    <ReportHtmlModel
      oTable={true}
      reportsData={mockReportData}
      reportConfigedElems={configElemsList}
      renderCustomComponent={()=>{ }}
      beforeReportRender={()=>{ }}
      afterReportRender={() => { }}
  />)
}

```

## API

### 属性

| 属性名                 | 说明          | 类型                                       | 默认    |
| --------------------- | ------------ | ------------------------------------------ | ----- |
| reportTypeList | 报告模版所属       | ^[Array]         | []     |
| baseElems | 报告基础元素集       | ^[Array]         | []     |
| configElemsList | 已配置模版元素集       | ^[Array]         | 0     |
| defaultElemsList | 默认配置模版元素集       | ^[Array]         |   []   |
| totalPage | 报告页数      | ^[number]         | 0     |
| mockReportData | 预览用报告数据      | ^[Array]        | []     |
| onChangeReportType | 改变报告所属回调 | ^[Function]`(reportType) => void` |-     |
| onSaveReportConfig | 保存报告配置回调 | ^[Function]`({configElemsList,reportType,totalPage}) => void` |
|   -     |  -   |    -     | -     |
| onTable | 是否开启Table布局     | ^[boolean]        | false     |
| reportsData | 报告数据     | ^[Array]        | []     |
| reportConfigedElems | 已配置模版元素集      | ^[Array]        | []    |
| renderCustomComponent | 渲染自定义组件    | ^[Function]`(reportData, elem) => void`        | -     |
| beforeReportRender | 报告渲染前    |^[Function]`(configedList, reportData) => void`       | -     |
| afterReportRender | 报告渲染后     | ^[Function]`(dragData) => void`        | -     |

- reportTypeList 类型
```javascript
baseELems = [
  { value: '新筛-室间质评计划报告', key: 'XS' }
]
```
#### 以下数据类型均为数组是为了支持可以同时生成多份报告

- configElemsList / defaultElemsList 类型
```javascript
configElemsList = [{
    label: '母亲姓名',
    id: 'motherName',
    component: 'baseText',  
    /* 组件类型有baseText, customText, customComponent, line, image, pageLine
     * baseText 基础文本 内容绑定id 渲染报告时从reportsData获取
     * customText 自定义文本 内容由用户编辑输入
     * customComponent 自定义组件 一般为较复杂元素比如表格等 画报告时该元素只占位 真是渲染由renderCustomComponent进行处理
     * line 分割线
     * image 图片 由用户自己上传
     * pageLine 分页符
     */
    style: {
      width: gridW * 4,
      height: gridH,
      top: 0,
      left: 0
    }
}]
```

- baseELems 类型
```javascript
baseELems = [{
  "id": "deptCode",
  "label": "单位(实验室)编码",
  "component": "baseText",  //customText, customComponent, line, image, pageLine
  "dynamic": false,
  "style": null
}]
```

- mockReportData / reportsData 类型
```javascript
configElemsList = [{
  deptName: '亳州市妇幼保健院新筛中心',
  motherName: '韩梅梅',
  phone: '0102111',
}]
```




