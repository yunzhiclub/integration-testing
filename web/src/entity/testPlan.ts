class LargeItem {
}

/**
 * 测试计划的实体
 */
export interface TestPlan{
  id: number,
  title: string,
  describe: string,
  status: number,
  createTime: number,
  /*测试用例*/
  testCaseLarge: LargeItem[]
  /*所属项目Id*/
  projectId: number
}
