import {TestCase} from "./test-case";

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
  /*所属大项*/
  testCase: TestCase;
  /*状态*/
  status: number;
  /*测试失败的issue测试地址*/
  issueUrl?: string;
  /*测试失败的描述*/
  describe?: string;
}
