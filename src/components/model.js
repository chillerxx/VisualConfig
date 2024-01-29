import { createGlobalStore } from 'hox'
import { useState } from 'react'

const reportConfigModel = () => {
  const [configElemsList, setConfigElemsList] = useState([])
  const [defaultElemsList, setDefaultElemsList] = useState([])
  const [curSelectedElemIndex, setCurSelectedElemIndex] = useState('')
  const [addedElem, setAddedElem] = useState('')
  const [curEditElem, setCurEditElem] = useState(null)
  const [totalPage, setTotalPage] = useState(1)

  function updateState(obj) {
    if (!obj) { return }
    for (const key in obj) {
      eval(key)(obj[key])
    }
  }

  return {
    curSelectedElemIndex,
    addedElem,
    configElemsList,
    defaultElemsList,
    curEditElem,
    totalPage,
    updateState
  }
}

export const [reportConfigStore] = createGlobalStore(reportConfigModel)
