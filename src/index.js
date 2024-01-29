import React from 'react';
import App from './components/ReportConfig'
import ReportHtmlModel from './components/ReportHtmlModel'
import { HoxRoot } from 'hox'

const ReportConfig = (props) => <HoxRoot><App {...props} /></HoxRoot>
export { ReportConfig, ReportHtmlModel }