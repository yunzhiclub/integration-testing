import {Project} from "./project";
import {TestItem} from "./test-item";

/**
 * 测试用例（大项）实体
 */
export interface TestCase {
  id: number;
  name: string;
  /*测试目的*/
  testPurpose: string;
  /*前置条件*/
  preconditions: string;
  /*是否展开小项*/
  isShow: boolean
  /*测试小项*/
  testItem: TestItem[];
  /*所属项目*/
  project: Project;
}
