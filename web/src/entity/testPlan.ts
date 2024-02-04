import {User} from "./user";
import {TestCase} from "./test-case";
import {Project} from "./project";
import {Task} from "./task";

/**
 * 测试计划的实体
 */
export interface  TestPlan {
  id: number,
  title: string,
  /*任务分配*/
  tasks: Task[]
  status: number,
  /*所属项目*/
  project: Project;
  createTime: number
}
