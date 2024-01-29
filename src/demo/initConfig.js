
// 默认报告配置用假数据
const mockReportData = [
  {
    processId: 'b1f4360f041646959a3339782826e038',
    deptCode: '001',
    deptId: 'e5dd96ad4e104fbe8500d02c2ae71207',
    deptName: '亳州市妇幼保健院新筛中心',
    activityName: '活动名称',
    programCode: '0102',
    batchNum: '1',
    responsibleDepartment: '负责科室',
    roomplanYear: '2023',
    contact: 1123353444,
    labDate: '2023-02-14',
    reportDate: '2023-04-11 00:00:00',
    totalScore: '100.0%',
    overallEvaluationTableList: [{ level: 13 }, { level: 12 }, { level: 13 }, { level: 12 }, { level: 13 }, { level: 12 }],
    reportDetailList: [
      {
        itemId: '61',
        itemName: 'AFP',
        score: '100.0%',
        calculateGroupName: '',
        groupLabNum: '1',
        unit: '',
        method: null,
        inName: 'AutoDELFIA',
        reagent: '12',
        standard: '123',
        roomResultList: [
          {
            roomDataLevel: '202311',
            roomResult: 2,
            roomX: 2,
            roomSd: 0,
            offset: '0.0',
            nsd: 0,
            range: '1.4~2.6',
            evaluateResult: '通过'
          },
          {
            roomDataLevel: '202312',
            roomResult: 2,
            roomX: 2,
            roomSd: 0,
            offset: '0.0',
            nsd: 0,
            range: '1.4~2.6',
            evaluateResult: '通过'
          },
          {
            roomDataLevel: '202313',
            roomResult: 2,
            roomX: 2,
            roomSd: 0,
            offset: '0.0',
            nsd: 0,
            range: '1.4~2.6',
            evaluateResult: '通过'
          },
          {
            roomDataLevel: '202314',
            roomResult: 2,
            roomX: 2,
            roomSd: 0,
            offset: '0.0',
            nsd: 0,
            range: '1.4~2.6',
            evaluateResult: '通过'
          },
          {
            roomDataLevel: '202315',
            roomResult: 2,
            roomX: 2,
            roomSd: 0,
            offset: '0.0',
            nsd: 0,
            range: '1.4~2.6',
            evaluateResult: '通过'
          }
        ],
        planStatisticsDtoList: [{ roomDataLevel: 'www' }, { roomDataLevel: 'wwrrw' }, { roomDataLevel: 'www' }, { roomDataLevel: 'wwrrw' }, { roomDataLevel: 'www' }, { roomDataLevel: 'wwrrw' }],
        describeList: [{ remark: 1 }, { remark: 2 }, { remark: 3 }, { remark: 1 }, { remark: 2 }, { remark: 3 }],
        projectName: 'AFP-HCG(中)',
        projectId: 1
      }
    ]
  }
]

export { mockReportData }