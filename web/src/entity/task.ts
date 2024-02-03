import {TestCase} from "./test-case";
import {User} from "./user";

export interface Task {
  testCase: TestCase[],
  testUser: User[],
}
