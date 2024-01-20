import {ApiInjector, MockApiInterface, RequestOptions} from "@yunzhi/ng-mock-api";
import {HttpParams} from "@angular/common/http";
import {generatePage} from "@yunzhi/ng-common";
import {randomNumber} from "@yunzhi/utils";
import {TestCase} from "../entity/test-case";

/**
 * 测试用例Mock
 */
export class TestCaseApi implements MockApiInterface{
  getInjectors(): ApiInjector[] {
    return [
      {
        method: 'GET',
        url: '/testCase/page',
        result: (urlMatcher: any, options: RequestOptions) => {
          const params = options.params as HttpParams;

          const page = +params.get('page');
          const size = +params.get('size');

          return generatePage<TestCase>(page, size, index => {
            return {
              id: randomNumber(100),
              name: '|--测试登录功能',

            } as TestCase;
          });
        }
      },
      {
        url: '/testCase/(\\d+)',
        method: 'DELETE',
      },
    ];
  }

}
