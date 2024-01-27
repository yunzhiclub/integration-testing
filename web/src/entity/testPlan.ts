import {User} from "./user";
import {TestCase} from "./test-case";
import {Project} from "./project";

/**
 * 测试计划的实体
 */
export interface  TestPlan {
  id: number,
  title: string,
  // todo 删除描述
  description: string,
  /*测试用例*/
  testCase: TestCase[],
  /*测试人*/
  testUser: User[],
  status: number,
  /*所属项目*/
  project: Project;
  createTime: number
}
