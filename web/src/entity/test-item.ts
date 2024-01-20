/**
 * 测试用例小项实体
 */
export interface TestItem {
  id: number;
  name: string;
  /*测试步骤*/
  steps: string;
  /*预期结果*/
  expectedResult: string;
}
