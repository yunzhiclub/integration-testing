import {ApiInjector, MockApiInterface, RequestOptions} from "@yunzhi/ng-mock-api";
import {HttpParams} from "@angular/common/http";
import {generatePage} from "@yunzhi/ng-common";
import {Project} from "../entity/project";
import {randomNumber} from "@yunzhi/utils";
import {Test} from "../entity/test";
import {TestPlan} from "../entity/testPlan";
import {User} from "../entity/user";
import {TestCase} from "../entity/test-case";

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
      }
    ];
  }

}
