import {User} from "./user";

/**
 * 小项测试用例
 */
export interface smallItem{
  id: number;
  title: string;
  describe: string;
  status: number;
  /*测试失败的报错信息*/
  bugInfo: string;
  /*失败后的issue地址*/
  issueUrl: string;
}
