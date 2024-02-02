import {User} from "./user";
import {TestCase} from "./test-case";
import {Project} from "./project";

/**
 * 测试计划的实体
 */
export interface  TestPlan {
  id: number,
  title: string,
  /*任务分配*/
  testAssignment: {testCase: TestCase[], testUser: User}[]
  status: number,
  /*所属项目*/
  project: Project;
  createTime: number;

}
