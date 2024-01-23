import {ApiInjector, MockApiInterface, RequestOptions} from "@yunzhi/ng-mock-api";
import {HttpParams} from "@angular/common/http";
import {generatePage} from "@yunzhi/ng-common";
import {TestCase} from "../entity/test-case";
import {randomBoolean, randomNumber, randomString} from "@yunzhi/utils";
import {TestCaseModel} from "../entity/test-case-model";
import {TestItem} from "../entity/test-item";
import {Project} from "../entity/project";

/**
 * 测试用例模型api
 */
export class TestCaseModelApi implements MockApiInterface{
  getInjectors(): ApiInjector[] {
    return [
      {
        method: 'GET',
        url: '/testCaseModel/page',
        result: (urlMatcher: any, options: RequestOptions) => {
          const params = options.params as HttpParams;

          const page = +params.get('page');
          const size = +params.get('size');

          return generatePage<TestCaseModel>(page, size, index => {
            return {
              id: randomNumber(100),
              testCase:
                {
                  id: randomNumber(100),
                  name: '|--测试登录功能111',
                  testPurpose: randomString('测试目的'),
                  preconditions: randomString('前置条件')
                } as TestCase,
              isShow: false,
              testItem: [
                {
                  id: randomNumber(100),
                  name: '测试小项目',
                  steps: randomString('测试步骤'),
                  expectedResult: randomString(''),
                } as TestItem,
                {
                  id: randomNumber(100),
                  name: '用正确的用户名密码登录系统',
                  steps: randomString('测试步骤'),
                  expectedResult: randomString('进入首页'),
                } as TestItem,
                {
                  id: randomNumber(100),
                  name: '测试小项目',
                  steps: randomString('测试步骤'),
                  expectedResult: randomString(''),
                } as TestItem
              ]
            } as TestCaseModel
          });
        }
      },
      {
        method: 'GET',
        url: '/testCaseModel/(\\d+)',
        result: (urlMatcher: any, options: HttpParams) => {
          const id = urlMatcher['id'] ? +urlMatcher['id'] : randomNumber(10);
          return {
            id,
            testCase: {} as TestCase,
            isShow: false,
            testItem: [],
          } as TestCaseModel;
        }
      },
      {
        url: '/testCaseModel/(\\d+)',
        method:  'PUT',
        result: (urlMatcher: string[], options: {body: {isShow: boolean}}) => {
          const isShow = options.body ;
          const id = +urlMatcher[1];
          return {
            id,
            isShow: !isShow,
          }
        }
      },
    ];
  }

}
