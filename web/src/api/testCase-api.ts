import {ApiInjector, MockApiInterface, RequestOptions} from "@yunzhi/ng-mock-api";
import {HttpParams} from "@angular/common/http";
import {generatePage} from "@yunzhi/ng-common";
import {Assert, randomNumber, randomString} from "@yunzhi/utils";
import {TestCase} from "../entity/test-case";
import {Project} from "../entity/project";
import {TestItem} from "../entity/test-item";

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
              name: '测试登录功能',
              testPurpose: randomString('测试目的'),
              preconditions: randomString('前置条件'),
              isShow: false,
              testItem: [
                {
                  id: randomNumber(100),
                  name: '|--测试小项目',
                  steps: randomString('测试步骤'),
                  expectedResult: randomString(''),
                } as TestItem,
                {
                  id: randomNumber(100),
                  name: '|--用正确的用户名密码登录系统',
                  steps: randomString('测试步骤'),
                  expectedResult: randomString('进入首页'),
                } as TestItem,
                {
                  id: randomNumber(100),
                  name: '|--测试小项目',
                  steps: randomString('测试步骤'),
                  expectedResult: randomString(''),
                } as TestItem
              ]
            } as TestCase;
          });
        }
      },
      {
        url: '/testCase/(\\d+)',
        method: 'DELETE',
      },
      {
        method: 'POST',
        url: '/testCase',
        result: (urlMatcher: string, options: {body: {project: Project, name: string, testPurpose: string, preconditions: string}}) => {
          const testCase = options.body as TestCase;
          return {
            id: randomNumber(10),
            name: testCase.name,
            testPurpose: testCase.testPurpose,
            preconditions: testCase.preconditions,
          } as TestCase
        }
      },
      {
        method: 'GET',
        url: '/testCase/(\\d+)',
        result: (urlMatcher: any, options: HttpParams) => {
          const id = urlMatcher['id'] ? +urlMatcher['id'] : randomNumber(10);
          return {
            id,
            name: '测试用例',
            testPurpose: randomString('测试目的'),
            preconditions: randomString('前置条件'),
            project: null,
          } as TestCase;
        }
      },
      {
        url: '/testCase/(\\d+)',
        method:  'PUT',
        result: (urlMatcher: string[], options: {body: {name: string, testPurpose: string, preconditions: string, project: Project}}) => {
          const testCase = options.body as TestCase;
          const id = +urlMatcher[1];
          return {
            id,
            name: testCase.name,
            testPurpose: testCase.testPurpose,
            preconditions: testCase.preconditions,
            project: testCase.project,
          } as TestCase
        }
      },
      {
        url: '/testCase/toggleCollapse/(\\d+)',
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
      {
        method: 'GET',
        url: '/testCase/getTestCaseByProjectId/(\\d+)',
        result: (urlMatcher: any, options: HttpParams) => {
          const projectId = urlMatcher['id'] ? +urlMatcher['id'] : randomNumber(10);
          return this.getTestByProjectId(projectId);
        }
      },
    ];
  }

  getTestByProjectId(id: number){
    Assert.isNumber(id, 'id必须是整形');


    if(!id) { return  []}

    if (id === 1) {
      return [
        {
          id: 1,
          name: '测试登录功能',
          testPurpose: randomString('测试目的'),
          preconditions: randomString('前置条件'),
          isShow: false,
        } as TestCase,

        {
          id: 2,
          name: '测试患者增删查改功能',
          testPurpose: randomString('测试目的'),
          preconditions: randomString('前置条件'),
          isShow: false
        } as TestCase,
      ]
    } else {
      return [
        {
          id: 3,
          name: '测试项目的增删查改功能',
          testPurpose: randomString('测试目的'),
          preconditions: randomString('前置条件'),
          isShow: false,
        } as TestCase,

        {
          id: 4,
          name: '对测试计划管理进行测试',
          testPurpose: randomString('测试目的'),
          preconditions: randomString('前置条件'),
          isShow: false
        } as TestCase,
      ]
    }

  }

}
