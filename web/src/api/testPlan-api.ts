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
  user = [{
    id: randomNumber(10),
    name: '张胜男',
  } as User,
    {
      id: randomNumber(10),
      name: '朱一龙',
    } as User
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
              title: name ? name : 'test1',
              status: randomNumber(4),
              project: {
                id: randomNumber(10),
                name: randomString('project', 3)
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
                }
              ] as Task[],
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
        result: (urlMatcher: any, options: { body: { project: Project, title: string } }) => {
          const testPlan = options.body as TestPlan;
          return {
            id: randomNumber(10),
            title: testPlan.title,
            status: randomNumber(0),
            project: testPlan.project,
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
            status: randomNumber(0),
            project: options.body.project,
            // testUser: [{id: 1} as User] as User[]
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
              }
            ] as Task[],
            createTime: new Date().getTime()
          } as TestPlan;
        }
      }
    ];
  }

}
