import {ApiInjector, MockApiInterface, RequestOptions} from "@yunzhi/ng-mock-api";
import {HttpParams} from "@angular/common/http";
import {generatePage} from "@yunzhi/ng-common";
import {Project} from "../entity/project";
import {randomNumber} from "@yunzhi/utils";
import {Test} from "../entity/test";
import {TestPlan} from "../entity/testPlan";
import {User} from "../entity/user";
import {TestCase} from "../entity/test-case";
import {TestItem} from "../entity/test-item";

export class TestApi implements MockApiInterface{

  private testPlans = [{
    id: randomNumber(10),
    title: 'test1',
  } as TestPlan,
    {
      id: randomNumber(10),
      title: 'test2',
    } as TestPlan,
    {
      id: randomNumber(10),
      title: 'test3',
    } as TestPlan,
    {
      id: randomNumber(10),
      title: 'test4',
    } as TestPlan,
  ];

  /*项目数组*/
  private projects = [{
    id: randomNumber(10),
    name: '牙科管理系统',
    } as Project,
    {
      id: randomNumber(10),
      name: '集成测试系统'
    } as Project,
    {
      id: randomNumber(10),
      name: '周汇报系统'
    } as Project,
    {
      id: randomNumber(10),
      name: '健康管理'
    } as Project,
  ];

  private testUsers = [{
    id: randomNumber(10),
    name: '张三'
  } as User,
    {
      id: randomNumber(10),
      name: '李四'
    } as User
  ]

  getInjectors(): ApiInjector[] {
    return [
      {
        method: 'GET',
        url: '/test/page',
        result: (urlMatcher: any, options: RequestOptions) => {
          const params = options.params as HttpParams;

          const page = +params.get('page');
          const size = +params.get('size');

          /*根据测试计划的任务分配，多个测试用例分配给一个人就是一个任务*/
          return generatePage<Test>(page, size, index => {
            return {
              id: randomNumber(100),
              testPlan: this.testPlans[Math.floor(Math.random() * this.testPlans.length)],
              testUser: this.testUsers[Math.floor(Math.random() * this.testUsers.length)],
              testCase: [
                {
                  name: '测试登录功能111'
                } as TestCase,
                {
                  name: '测试用户管理'
                } as TestCase,
                {
                  name: '测试xxx'
                } as TestCase,
              ] as TestCase[],
              project: this.projects[Math.floor(Math.random() * this.projects.length)],
              status: randomNumber(3)+1
            } as Test;
          });
        }
      },
      {
        method: 'GET',
        url: '/test/page/(\\d+)',
        result: (urlMatcher: any, options: RequestOptions) => {
          const currentUserId = urlMatcher['currentUserId'] ? +urlMatcher['currentUserId'] : randomNumber(10);
          const params = options.params as HttpParams;

          const page = +params.get('page');
          const size = +params.get('size');

          /*根据测试计划的任务分配，多个测试用例分配给一个人就是一个任务*/
          return generatePage<Test>(page, size, index => {
            return {
              id: randomNumber(100),
              testPlan: this.testPlans[Math.floor(Math.random() * this.testPlans.length)],
              testUser: this.getCurrentUserById(currentUserId),
              testCase: [
                {
                  name: '测试登录功能111'
                } as TestCase,
                {
                  name: '测试用户管理'
                } as TestCase,
                {
                  name: '测试xxx'
                } as TestCase,
              ] as TestCase[],
              project: this.projects[Math.floor(Math.random() * this.projects.length)],
              status: randomNumber(3)+1
            } as Test;
          });
        }
      },
      {
        method: 'GET',
        url: '/getTestById/(\\d+)',
        description: '根据id获取测试小项',
        result: (urlMatcher: any) => {
          const testId = urlMatcher['testId'] ? +urlMatcher['testId'] : randomNumber(10);

          return {
            id: testId,
            testCase: [
              {
                name: '测试登录失败',
                testItems: [
                  {
                    id: randomNumber(),
                    name: '正确的用户名和密码登录',
                    steps: '输入正确的用户名，正确的秘密',
                    expectedResult: '进入系统首页',
                    status: 1,
                  }
                ] as TestItem[],
              },
              {
                name: '测试用户管理',
                testItems: [
                  {
                    id: randomNumber(),
                    name: '删除普通用户',
                    steps: '直接删除用户',
                    expectedResult: '提示删除成功，且成员中没有该用户',
                    status: 4
                  },
                  {
                    id: randomNumber(),
                    name: '添加普通用户',
                    steps: '1输入正确的学号，2输入正确的姓名',
                    expectedResult: '提示添加成功',
                    status: 5,
                    issueUrl: 'web: 添加用户失败',
                    describe: '提示添加失败，且没有添加的用户信息'
                  },
                  {
                    id: randomNumber(),
                    name: '修改普通用户信息',
                    steps: '选择用户，修改信息',
                    expectedResult: '提示修改成功， 信息被成功修改',
                    status: 6,
                    issueUrl: 'web: 修改用户失败',
                    describe: '提示修改失败，且信息没有变化'
                  }
                ] as TestItem[],
              }
            ] as TestCase[],
          } as Test
        }
      }
    ];
  }

  getCurrentUserById(id: number): User{
    return {
      id,
      name: '周周一',
      username: 'zhouzhouyi'
    } as User;
  }

}
