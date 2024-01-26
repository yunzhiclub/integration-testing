import {ApiInjector, MockApiInterface} from "@yunzhi/ng-mock-api";
import {Project} from "../entity/project";
import {TestCase} from "../entity/test-case";
import {randomNumber, randomString} from "@yunzhi/utils";
import {TestItem} from "../entity/test-item";
import {HttpParams} from "@angular/common/http";

/**
 * 测试用例小项Mock
 */
export class TestItemApi implements MockApiInterface{
  getInjectors(): ApiInjector[] {
    return [
      {
        method: 'POST',
        url: '/testItem',
        result: (urlMatcher: string, options: {body: {name: string, steps: string, expectedResult: string, testCase: TestCase}}) => {
          const testItem = options.body as TestItem;
          return {
            id: randomNumber(10),
            name: testItem.name,
            steps: testItem.steps,
            expectedResult: testItem.expectedResult,
            testCase: testItem.testCase
          } as TestItem
        }
      },
      {
        url: '/testItem/(\\d+)',
        method: 'DELETE',
      },
      {
        method: 'GET',
        url: '/testItem/(\\d+)',
        result: (urlMatcher: any, options: HttpParams) => {
          const id = urlMatcher['id'] ? +urlMatcher['id'] : randomNumber(10);
          return {
            id,
            name: '测试小项名称',
            steps: randomString('测试步骤'),
            expectedResult: randomString('预期结果'),
          } as TestItem;
        }
      },
      {
        url: '/testItem/(\\d+)',
        method:  'PUT',
        result: (urlMatcher: string[], options: {body: {name: string, steps: string, expectedResult: string}}) => {
          const testItem = options.body as TestItem;
          const id = +urlMatcher[1];
          return {
            id,
            name: testItem.name,
            steps: testItem.steps,
            expectedResult: testItem.expectedResult,
          } as TestItem
        }
      },
    ];
  }

}
