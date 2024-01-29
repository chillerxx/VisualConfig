import React from 'react'
import App from './ReportConfig'
import ReportHtmlModel from './ReportHtmlModel'
import { HoxRoot } from 'hox'

const ReportConfig = (props) => <HoxRoot><App {...props} /></HoxRoot>
export { ReportConfig, ReportHtmlModel }

