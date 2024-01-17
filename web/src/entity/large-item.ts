import {User} from "./user";

/**
 * 大项测试用例
 */
export interface largeItem{
  id: number;
  title: string;
  testUser: User;
  status: number;
  /*所属测试计划的Id*/
  testPlanId: number;
}
