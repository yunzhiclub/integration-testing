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
  /*描述*/
  describe: string;
  /*项目测试计划*/
  testPlane: [];
  createTime: number;
}
