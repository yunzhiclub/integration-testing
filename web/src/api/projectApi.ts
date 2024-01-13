import {ApiInjector, MockApiInterface, RequestOptions} from "@yunzhi/ng-mock-api";
import {HttpParams} from "@angular/common/http";
import {generatePage} from "@yunzhi/ng-common";
import {User} from "../entity/user";
import {randomNumber, randomString} from "@yunzhi/utils";
import {Project} from "../entity/project";

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
              name: '牙科管理系统',
              projectUrl: ' http://app.mengyunzhi.com:17121',
              repositoryUrl: 'http://gitlab.mengyunzhi.com:2448/yunzhiclub/dentistry',
              describe: '',
              testPlane: [],
              createTime: new Date().getTime()
            } as Project;
          });
        }
      }
    ];
  }

}
