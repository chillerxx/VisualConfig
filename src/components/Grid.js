import React from 'react'
import { gridH, gridW } from './utils'

const d = ['M', gridW, 0, 'L', 0, 0, 0, gridH]
const Grid = () => {
  return <svg width="100%" height="100%">
    <defs>
      <pattern
        id="grid"
        width={gridW}
        height={gridH}
        patternUnits="userSpaceOnUse"
      >
        <rect width={gridW} height={gridH} fill="none"></rect>
        <path
          d={d.join(' ')}
          fill="none"
          stroke="rgba(186, 186, 186, 0.8)"
          strokeWidth="1"
        >
        </path>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)"></rect>
  </svg >
}

export default Grid
