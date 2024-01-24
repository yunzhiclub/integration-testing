import {ApiInjector, MockApiInterface, RequestOptions} from "@yunzhi/ng-mock-api";
import {HttpParams} from "@angular/common/http";
import {generatePage} from "@yunzhi/ng-common";
import {randomNumber, randomString} from "@yunzhi/utils";
import {TestPlan} from "../entity/testPlan";
import {Project} from "../entity/project";
import {User} from "../entity/user";

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
              describe: randomString('描述'),
              testUser: this.user,
              status: randomNumber(3),
              project: {
                id: randomNumber(10),
                name: randomString('project', 3)
              } as Project,
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
        result: (urlMatcher: any, options: { body: { project: Project, title: string, describe: string } }) => {
          const testPlan = options.body as TestPlan;
          return {
            id: randomNumber(10),
            title: testPlan.title,
            describe: testPlan.describe,
            status: randomNumber(0),
            project: testPlan.project,
            createTime: new Date().getTime()
          } as TestPlan
        }
      },
    ];
  }

}
