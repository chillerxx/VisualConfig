import React from 'react'
import { reportConfigStore } from "./model";

const ButtonArea = ({ renderBtns, reportType }) => {
  const { configElemsList, totalPage } = reportConfigStore()
  let params = { elements: configElemsList, id: reportType, totalPage }

  return <div className='buttonArea'>
    {renderBtns && renderBtns(params)}
  </div>
}

export default ButtonArea
