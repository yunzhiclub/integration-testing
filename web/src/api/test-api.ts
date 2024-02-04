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
  getInjectors(): ApiInjector[] {
    return [
      {
        method: 'GET',
        url: '/test/page',
        result: (urlMatcher: any, options: RequestOptions) => {
          const params = options.params as HttpParams;

          const page = +params.get('page');
          const size = +params.get('size');

          return generatePage<Test>(page, size, index => {
            return {
              id: randomNumber(100),
              testPlan: {
                testAssignment: [

                ]
              } as TestPlan,
              testUser: {} as User,
              testCase: [] as TestCase[],
              project: {} as Project,
              status: randomNumber(3)
            } as Test;
          });
        }
      }
    ];
  }

}
