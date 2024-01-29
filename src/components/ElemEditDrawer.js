import React, { useState, useEffect } from 'react'
import { reportConfigStore } from "./model";
import { LoadingOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { Drawer, Form, Input, Button, Radio, Upload, Select, InputNumber, Slider, Row, Switch } from 'antd'
import { AlignLeftOutlined, AlignCenterOutlined, AlignRightOutlined } from '@ant-design/icons'
import { cloneDeep } from 'lodash'
import { getBase64 } from './utils'
import Sketch from '@uiw/react-color-sketch'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 12 },
  className: 'my-form'
}
const formItemLayout2 = {
  labelCol: { span: 8 },
  wrapperCol: { span: 17 },
  className: 'my-form'
}
const formItemLayoutAlign = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
  className: 'my-form'
}
const sizeList = [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64]
const formatList = ['YYYY-MM-DD', 'YYYY-MM', 'MM-DD', 'YYYY']

const ElemEditDrawer = () => {
  const { configElemsList, curEditElem, updateState } = reportConfigStore()
  const [openFieldDetail, setOpenFieldDetail] = useState(false)
  const [elemDetail, setElemDetail] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [imageLoading, setImageLoading] = useState(false)
  const [form] = Form.useForm()
  const borderRadius = Form.useWatch('borderRadius', form)

  useEffect(() => {
    curEditElem && onUpdateElemDetail(curEditElem)
  }, [curEditElem])

  useEffect(() => {
    if (!openFieldDetail) {
      setElemDetail(null)
      setImageUrl(null)
    }
  }, [openFieldDetail])

  const onUpdateElemDetail = ({ itemData, index }) => {
    const { id, label, component, style } = itemData
    const {
      dateFormat, isFloat, direction, imageFile,
      textAlign, fontSize, fontWeight, borderWidth, borderColor, background, borderRadius, color, height, width
    } = style
    const init = {
      dateFormat, index, id, label, component, imageFile, direction, isFloat,
      textAlign, fontSize, fontWeight, borderWidth, borderColor, borderRadius, background, color,
      lineHeight: direction === 'vertical' ? width : height,
      lineWidth: direction === 'vertical' ? height : width
    }
    setElemDetail(init)
    form.setFieldsValue(init)
    setImageUrl(imageFile)
    setOpenFieldDetail(true)
  }

  const onSaveELem = (values) => {
    const {
      label, id, dateFormat, isFloat, direction, lineWidth,
      fontSize, fontWeight, borderWidth, borderColor, background, borderRadius, color, lineHeight, textAlign
    } = values
    const list = cloneDeep(configElemsList)
    list[elemDetail.index].label = label
    const style = { isFloat, dateFormat, textAlign, fontSize, fontWeight, borderColor, background, borderRadius, color, direction, borderWidth: borderWidth || 0 }
    list[elemDetail.index].style = { ...list[elemDetail.index].style, ...style }
    if (id === 'image') { list[elemDetail.index].style.imageFile = imageUrl }
    if (id === 'line') {
      if (direction === 'horizontal') {
        list[elemDetail.index].style.height = lineHeight
        list[elemDetail.index].style.width = lineWidth
      } else {
        list[elemDetail.index].style.height = lineWidth
        list[elemDetail.index].style.width = lineHeight
      }
    }
    updateState({ setConfigElemsList: list })
    setOpenFieldDetail(false)
  }

  const handleChange = (info) => {
    setImageLoading(true)
    if (info) {
      getBase64(info.file.originFileObj, (url) => {
        setImageLoading(false)
        setImageUrl(url)
      })
    }
  }

  const uploadButton = (
    <div>
      {imageLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div>上传</div>
    </div>
  )

  const ColorPicker = ({ value, onChange, attr }) => {
    const [visible, setVisible] = useState(false)
    useEffect(() => {
      document.addEventListener('click', function () { setVisible(false) })
      return document.removeEventListener('click', function () { setVisible(false) })
    }, [])
    const onClick = (e) => {
      e.nativeEvent.stopImmediatePropagation()
      setVisible(!visible)
    }
    let className = ''
    if (value === '#ffffff') {
      className = attr === 'background' ? 'whiteBackground' : 'whiteBorder'
    }
    return <div className='colorPicker'>
      <span className={className} style={{ borderColor: value, [attr]: value }} onClick={onClick} />
      {visible
        ? <Sketch
          color={value}
          onClick={(e) => e.nativeEvent.stopImmediatePropagation()}
          onChange={(color) => { onChange(color.hex) }}
        />
        : ''
      }
    </div>
  }
  const BoldButton = ({ value, onChange }) => {
    const changeValue = value === 'bold' ? 'normal' : 'bold'
    return <i className={`boldBtnText ${value === 'bold' ? 'checkBold' : ''}`} onClick={() => onChange(changeValue)}> B</i >
  }

  const isDynamic = curEditElem && curEditElem.itemData.dynamic
  const isImage = elemDetail && elemDetail.component === 'image'
  const isLine = elemDetail && elemDetail.component === 'line'
  const isBaseELem = elemDetail && elemDetail.component === 'baseText'
  const isDate = elemDetail && elemDetail.id === 'currentDate'


  return <Drawer
    title="编辑元素"
    placement="right"
    onClose={() => setOpenFieldDetail(false)}
    className='editReportElem'
    visible={openFieldDetail}
    footer={<div className='button-wrap'>
      <Button type='primary' onClick={form.submit}>提交</Button>
      <Button onClick={() => setOpenFieldDetail(false)}>取消</Button>
    </div>}
  >
    <Form {...formItemLayout} onFinish={onSaveELem} form={form} >
      <span className='editAttr'>元素</span>
      <Row className='editAttrWrap' ><FormItem label="元素字段" name="id"  {...formItemLayout2}><Input disabled /></FormItem></Row>
      <Row className='editAttrWrap' ><FormItem label="显示内容" name="label" {...formItemLayout2}><Input disabled={isBaseELem || isLine} /></FormItem></Row>
      {isDate
        ?
        <Row className='editAttrWrap'><FormItem label="日期格式" name="dateFormat" {...formItemLayout2}>
          <Select placeholder='请选择'>
            {formatList.map((item, i) => <Select.Option key={i} value={item}>{item}</Select.Option>)}
          </Select>
        </FormItem ></Row>
        : null
      }
      {
        isImage
          ? <Row style={{ marginLeft: 16 }}>
            <FormItem {...formItemLayout2} className='uploadItem' label="上传图片" name="imageFile" >
              <Upload name="avatar" listType="picture-card" showUploadList={false} onChange={handleChange}>
                {imageUrl
                  ? <div className='reportImgElem'><img src={imageUrl} alt="图片" width={102} height={102} />
                    <div className='delIcon' onClick={e => e.stopPropagation()}>
                      <DeleteOutlined onClick={() => setImageUrl('')} />
                    </div>
                  </div>
                  : uploadButton
                }
              </Upload>
            </FormItem>
          </Row>
          : null
      }
      {
        !isDynamic
          ? <Row className='editAttrWrap'>
            <FormItem label='是否浮动' name='isFloat' {...formItemLayout2}>
              <Radio.Group>
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>
            </FormItem>
          </Row>
          : null
      }
      {!(isImage || isLine)
        ? <>
          <span className='editAttr'>字符</span>
          <Row>
            <FormItem className='labelBottom' colon={false} label="字号" name="fontSize" >
              <Select placeholder='请选择' style={{ width: 100 }}>
                {sizeList.map((item, i) => <Select.Option key={i} value={item}>{item}</Select.Option>)}
              </Select>
            </FormItem >
            <FormItem className='labelBottom' colon={false} label="加粗" name="fontWeight" ><BoldButton /></FormItem>
            <FormItem className='labelBottom' colon={false} label="颜色" name="color" ><ColorPicker attr='background' /></FormItem>
            <FormItem {...formItemLayoutAlign} className='labelBottom' colon={false} label="对齐" name="textAlign" initialValue='left'>
              <Radio.Group >
                <Radio.Button value="left"><AlignLeftOutlined /></Radio.Button>
                <Radio.Button value="center"><AlignCenterOutlined /></Radio.Button>
                <Radio.Button value="right"><AlignRightOutlined /></Radio.Button>
              </Radio.Group>
            </FormItem>
          </Row>
          <span className='editAttr'>元素样式</span>
          <Row style={{ alignItems: 'flex-end' }}>
            <FormItem className='labelTop' colon={false} label='边框圆角' name="borderRadius" >
              <Slider style={{ width: 190 }} min={1} max={20} />
            </FormItem>
            <InputNumber min={0} max={20} style={{ width: 60 }} value={borderRadius} onChange={(v) => form.setFieldValue('borderRadius', v)} />
          </Row>
          <Row>
            <FormItem className='labelBottom' colon={false} label="边框宽度" name="borderWidth" ><InputNumber min={0} max={20} style={{ width: 100 }} /></FormItem>
            <FormItem className='labelBottom' colon={false} label="填充" name="background" ><ColorPicker attr='background' /></FormItem>
            <FormItem className='labelBottom' colon={false} label="边框" name="borderColor" ><ColorPicker attr='borderColor' /></FormItem>
          </Row>
        </>
        : null
      }
      {
        isLine
          ? <>
            <span className='editAttr'>线段</span>
            <Row>
              <FormItem label="线段方向" name="direction" {...formItemLayout2}>
                <Radio.Group >
                  <Radio value={'vertical'}>横向</Radio>
                  <Radio value={'horizontal'}>纵向</Radio>
                </Radio.Group>
              </FormItem>
            </Row>
            <Row>
              <FormItem className='labelBottom' colon={false} label="线段宽度" name="lineWidth" ><InputNumber min={1} style={{ width: 100 }} /></FormItem>
              <FormItem className='labelBottom' colon={false} label="线段长度" name="lineHeight" ><InputNumber min={1} style={{ width: 100 }} /></FormItem>
              <FormItem className='labelBottom' colon={false} label="填充" name="background" ><ColorPicker attr='background' /></FormItem>
            </Row>
          </>
          : null
      }
    </Form >
  </Drawer >
}

export default ElemEditDrawer
