import {ApiInjector, MockApiInterface, RequestOptions} from "@yunzhi/ng-mock-api";
import {HttpParams} from "@angular/common/http";
import {generatePage} from "@yunzhi/ng-common";
import {randomNumber, randomString} from "@yunzhi/utils";
import {TestPlan} from "../entity/testPlan";
import {Project} from "../entity/project";
import {User} from "../entity/user";
import {Task} from "../entity/task";
import {TestCase} from "../entity/test-case";

export class TestPlanApi implements MockApiInterface {

  private names = ["test1", "test2", "test3", "test4", "test5"];

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

  getInjectors(): ApiInjector[] {
    return [
      {
        method: 'GET',
        url: '/testPlan/page',
        result: (urlMatcher: any, options: RequestOptions) => {
          const params = options.params as HttpParams;

          const page = +params.get('page');
          const size = +params.get('size');
          const name = params.get('name') ? params.get('name') : ""

          return generatePage<TestPlan>(page, size, index => {
            return {
              id: randomNumber(10),
              title: name ? name : this.names[Math.floor(Math.random() * this.names.length)],
              status: randomNumber(4),
              project: this.projects[Math.floor(Math.random() * this.projects.length)],
              tasks: this.tasks(),
              createTime: new Date().getTime()
            } as TestPlan;
          });
        }
      },
      {
        url: '/testPlan/(\\d+)',
        method: 'DELETE',
      },
      {
        method: 'POST',
        url: '/testPlan',
        result: (urlMatcher: any, options: { body: { project: Project, title: string, tasks: Task[] } }) => {
          const testPlan = options.body as TestPlan;
          return {
            id: randomNumber(10),
            title: options.body.title,
            tasks: options.body.tasks,
            status: randomNumber(0),
            project: options.body.project,
            createTime: new Date().getTime()
          } as TestPlan
        }
      },
      {
        method: 'POST',
        url: '/testPlan/batchTestPlan',
        result: (urlMatcher: any, options: {
          body: { project: Project, title: string, tasks: Task[] }
        }) => {
          return [{
            id: randomNumber(10),
            title: options.body.title,
            tasks: options.body.tasks,
            status: randomNumber(0),
            project: options.body.project,
            createTime: new Date().getTime()
          } as TestPlan] as TestPlan[]
        }
      },
      {
        method: 'GET',
        url: '/testPlan/(\\d+)',
        result: (urlMatcher: any) => {
          const id = urlMatcher['id'] ? +urlMatcher['id'] : randomNumber(10);

          return {
            id: id,
            title: randomString('测试计划标题'),
            status: randomNumber(4),
            project: {
              id: 1,
              name: randomString('project', 3),
            } as Project,
            tasks: [
              {
                testCase: [{
                  id: randomNumber(),
                  name: randomString('测试名称'),
                }] as TestCase[],
                testUser: {
                  id: randomNumber(),
                  name: randomString('测试人姓名')
                } as User,
              },
              {
                testCase: [{
                  id: randomNumber(),
                  name: randomString('测试名称'),
                }] as TestCase[],
                testUser: {
                  id: randomNumber(),
                  name: randomString('测试人姓名')
                } as User,
              }
            ] as Task[],
            createTime: new Date().getTime()
          } as TestPlan;
        }
      }
    ];
  }

  tasks(): Array<Task>{
    return [
      {
        testCase: [
          {
            id: randomNumber(),
            name: '测试登录功能',
          }
        ] as TestCase[],
        testUser: {
          id: randomNumber(),
          name: '张三'
        } as User,
      },
      {
        testCase: [{
          id: randomNumber(),
          name: '测试用户管理',
        },
          {
            id: randomNumber(),
            name: '测试xxx',
          }
        ] as TestCase[],
        testUser: {
          id: randomNumber(),
          name: '李四'
        } as User,
      },
    ] as Task[]
  }

}
