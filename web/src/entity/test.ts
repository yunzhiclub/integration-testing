import {TestPlan} from "./testPlan";
import {TestCase} from "./test-case";
import {Project} from "./project";
import {User} from "./user";

/**
 * 测试实体
 */
export interface Test {
  id: number;
  /*所属测试计划*/
  testPlan: TestPlan,
  /*测试人*/
  testUser: User,
  /*所属测试用例*/
  testCase: TestCase[],
  /*所属项目*/
  project: Project,
  status: number
}
