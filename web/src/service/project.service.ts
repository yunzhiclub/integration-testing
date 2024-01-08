import { Injectable } from '@angular/core';
import {Action, Store} from '@tethys/store';
import {Page} from "@yunzhi/ng-common";
import {User} from "../entity/user";

/**
 * 项目的状态管理
 */
interface ProjectState extends Store<Project>{
  pageData: Page<Project>;
}
@Injectable({
  providedIn: 'root'
})
export class ProjectService extends Store<ProjectState>{

  static pageData(state: ProjectState): Page<Project> {
    return state.pageData;
  }

  constructor() {
    super( {
      pageData: new Page<Project>({}),
    });
  }


}
