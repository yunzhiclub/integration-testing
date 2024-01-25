import {TestPlan} from "./testPlan";
import {TestCase} from "./test-case";

/**
 * 项目实体
 */
export interface Project{
  id: number;
  name: string;
  /*项目测试环境地址*/
  projectUrl: string;
  /*项目代码仓库地址*/
  repositoryUrl: string;
  /*项目测试计划*/
  testPlane: TestPlan[];
  /*测试用例*/
  testCase: TestCase[];
  createTime: number;
}
