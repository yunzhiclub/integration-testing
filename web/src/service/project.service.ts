import { Injectable } from '@angular/core';
import {Action, Store} from '@tethys/store';
import {Page} from "@yunzhi/ng-common";
import {Assert} from "@yunzhi/utils";
import {Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Project} from "../entity/project";

/**
 * 项目的状态管理
 */
interface ProjectState extends Store<Project>{
  pageData: Page<Project>;
  httpParams: {page: number, size: number, name?: string};
}
@Injectable({
  providedIn: 'root'
})
export class ProjectService extends Store<ProjectState>{

  static pageData(state: ProjectState): Page<Project> {
    return state.pageData;
  }

  constructor(private httpClient: HttpClient) {
    super( {
      pageData: new Page<Project>({}),
      httpParams: {page: 0, size: 0, name: ''}
    });
  }

  /**
   * 分页数据
   */
  @Action()
  pageAction(payload: {page: number, size: number, name?: string}): Observable<Page<Project>> {
    Assert.isNumber(payload.page, 'page不能为空');
    Assert.isNumber(payload.size, 'size不能为空');

    //获取state快照
    const state = this.snapshot;
    state.httpParams = payload;
    return this.httpClient.get<Page<Project>>('/project/page', {params: payload})
      .pipe(
        tap(data => {
          state.pageData = data as Page<Project>;
          this.next(state);
        }),
      );
  }

}
