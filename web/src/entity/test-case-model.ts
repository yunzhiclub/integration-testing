import {TestCase} from "./test-case";
import {TestItem} from "./test-item";

/**
 * 测试用例模型实体
 */
export interface TestCaseModel {
  id: number,
  /*测试用例大项*/
  testCase: TestCase;
  /*是否展示*/
  isShow: Boolean;
  /*测试用例小项*/
  testItem: TestItem[];
}
