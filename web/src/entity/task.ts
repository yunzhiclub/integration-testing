import {TestCase} from "./test-case";
import {User} from "./user";
/**
 * 测试任务的实体
* */
export interface Task {
  /*多个测试用例大项*/
  testCase: TestCase[],
  /*分配给一个测试人*/
  testUser: User,
}
