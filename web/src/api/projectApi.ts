import {ApiInjector, MockApiInterface, RequestOptions} from "@yunzhi/ng-mock-api";
import {HttpParams} from "@angular/common/http";
import {generatePage} from "@yunzhi/ng-common";
import {Assert, randomNumber, randomString} from "@yunzhi/utils";
import {Project} from "../entity/project";
import {TestPlan} from "../entity/testPlan";

export class ProjectApi implements MockApiInterface {
  getInjectors(): ApiInjector[] {
    return [
      {
        method: 'GET',
        url: '/project/page',
        result: (urlMatcher: any, options: RequestOptions) => {
          const params = options.params as HttpParams;

          const page = +params.get('page');
          const size = +params.get('size');
          const name = params.get('name') ? params.get('name') : ""

          return generatePage<Project>(page, size, index => {
            return {
              id: randomNumber(100),
              name: name ? name : '牙科管理系统',
              projectUrl: ' http://app.mengyunzhi.com:17121',
              repositoryUrl: 'http://gitlab.mengyunzhi.com:2448/yunzhiclub/dentistry',
              describe: '',
              testPlane: [],
              createTime: new Date().getTime()
            } as Project;
          });
        }
      },
      {
        method: 'POST',
        url: '/project',
        result: (urlMatcher: any, options: {body: {name: string, projectUrl: string, repositoryUrl: string}}) => {
          const project = options.body as Project;
          return {
            id: randomNumber(10),
            name: project.name,
            projectUrl: project.projectUrl,
            repositoryUrl: project.repositoryUrl,
            createTime: new Date().getTime()
          } as Project
        }
      },
      {
        url: '/project/(\\d+)',
        method: 'GET',
        result: (urlMatcher: any) => {
          const id = urlMatcher['id'] ? +urlMatcher['id'] : randomNumber(10);
          return {
            id,
            name: '牙科',
            projectUrl: 'http: ',
            repositoryUrl: 'http://',
            createTime: new Date().getTime()
          } as Project;
        }
      },
      {
        url: '/project/getAll',
        method: 'GET',
        result: (urlMatch: string[], options: RequestOptions) => {
          const param = options.params as HttpParams;
          const name = param.get('name') ? param.get('name') : '';
          return this.getProjects(randomNumber(20), name);
        }
      },
      {
        url: '/project/(\\d+)',
        method:  'PUT',
        result: (urlMatcher: string[], options: {body: {name: string, projectUrl: string, repositoryUrl: string}}) => {
          const project = options.body as Project;
          const id = +urlMatcher[1];
          return {
            id,
            name: project.name,
            projectUrl: project.projectUrl,
            repositoryUrl: project.repositoryUrl,
          } as Project
        }
      },
      {
        url: '/project/(\\d+)',
        method: 'DELETE',
      },
      {
        url: '/project/testPlan/(\\d+)',
        method: 'DELETE',
      },
      {
        url: '/project/getTestPlanPage/(\\d+)',
        method: 'GET',
        result: (urlMatcher: string[], options: RequestOptions) => {
          let projectId: number;
          const params = options.params as HttpParams;
          const page = +params.get('page');
          const size = +params.get('size');
          const name = params.get('name') ? params.get('name') : '';

          Assert.isInteger(page, 'page类型不存在');
          Assert.isInteger(size, 'size类型不存在');

          if (urlMatcher) {
            projectId = +urlMatcher[1];
          }
          return generatePage<TestPlan>(page, size, index => {
              return {
                id: index + 1,
                title: randomString('12'),
                describe: randomString('测试'),
                createTime: new Date().getTime()
              } as TestPlan;
            }
          );
        }
      },
    ];
  }
  
  getProjects(size: number, name?: string): Project[] {
    const patients = new Array<Project>();
    
    for (let i = 0; i < size; i++) {
      const patient = {
        id: i,
        name: name ? name : '牙科管理系统',
        projectUrl: ' http://app.mengyunzhi.com:17121',
        repositoryUrl: 'http://gitlab.mengyunzhi.com:2448/yunzhiclub/dentistry'
      } as Project;
      patients.push(patient);
    }
    return patients;
  }

}
