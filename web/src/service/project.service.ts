import {Injectable} from '@angular/core';
import {Action, Store} from '@tethys/store';
import {Page} from "@yunzhi/ng-common";
import {Assert} from "@yunzhi/utils";
import {Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Project} from "../entity/project";
import * as _ from "lodash";
import {TestPlan} from "../entity/testPlan";
import {state} from "@angular/animations";
import {TestCase} from "../entity/test-case";

/**
 * 项目的状态管理
 */
interface ProjectState extends Store<Project> {
  pageData: Page<Project>;
  httpParams: { page: number, size: number, name?: string };
  getById: Project,
  projectId: number,
  testPlanPageData: Page<TestPlan>;
  testPlanParam: { page: number, size: number, name?: string };
  getAll: Project[]
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends Store<ProjectState> {

  static pageData(state: ProjectState): Page<Project> {
    return state.pageData;
  }

  static testPlanPageData(state: ProjectState): Page<TestPlan> {
    return state.testPlanPageData;
  }


  static getById(state: ProjectState): Project {
    return state.getById;
  }

  constructor(private httpClient: HttpClient) {
    super({
      pageData: new Page<Project>({}),
      httpParams: {page: 0, size: 0, name: ''},
      getById: null,
      testPlanParam: {page: 0, size: 0, name: ''},
      getAll: []
    });
  }

  /**
   * 分页数据
   */
  @Action()
  pageAction(payload: { page: number, size: number, name?: string }): Observable<Page<Project>> {
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

  @Action()
  addAction(project: { name: string, projectUrl: string, repositoryUrl: string }): Observable<Project> {
    Assert.isNotNullOrUndefined(project.name);
    Assert.isNotNullOrUndefined(project.projectUrl);
    Assert.isNotNullOrUndefined(project.repositoryUrl);

    project = project as Project;
    return this.httpClient.post<Project>('/project', project).pipe(tap(value => {
      const state = this.getState();
      state.pageData.content.unshift(value as Project);

      this.next(state);
    }));
  }

  @Action()
  getById(id: number): Observable<Project> {
    Assert.isNumber(id, 'id类型不正确');
    return this.httpClient.get<Project>(`/project/${id}`).pipe(tap(data => {
      const state = this.getState();
      state.getById = data as Project;
      this.next(state);
    }))
  }

  @Action()
  updateAction(id: number, project: { name: string, projectUrl: string, repositoryUrl: string }): Observable<Project> {
    Assert.isNumber(id, 'id类型不是Number');
    Assert.isNotNullOrUndefined(project.name);
    Assert.isNotNullOrUndefined(project.projectUrl);
    Assert.isNotNullOrUndefined(project.repositoryUrl);

    project = project as Project;
    return this.httpClient.put<Project>(`/project/${id}`, project).pipe(tap(value => {
      const state = this.getState();
      project = _.find(state.pageData.content, {id}) as Project;
      if (project) {
        project.name = value.name;
        project.projectUrl = value.projectUrl;
        project.repositoryUrl = value.repositoryUrl;
      }

      this.next(state);
      this.pageAction(state.httpParams);
    }));
  }

  @Action()
  deleteAction(id: number): Observable<void> {
    Assert.isNumber(id, 'id类型不正确');
    return this.httpClient.delete<void>(`/project/${id}`).pipe(tap(() => {
      const state = this.getState();
      state.pageData.content = state.pageData.content.filter(project => project.id !== id);
      this.next(state);

      this.pageAction(state.httpParams);
    }));
  }

  @Action()
  deleteTestPlanAction(id: number): Observable<void> {
    Assert.isNumber(id, 'id类型不正确');
    return this.httpClient.delete<void>(`/project/testPlan/${id}`).pipe(tap(() => {
      const state = this.getState();
      state.pageData.content = state.pageData.content.filter(testPlan => testPlan.id !== id);
      this.next(state);

      this.pageAction(state.httpParams);
    }));
  }

  @Action()
  testPlanPageAction(id: number, payload: { page: number; size: number; name?: string }): Observable<Page<TestPlan>> {
    Assert.isNumber(payload.page, 'page不能为空');
    Assert.isNumber(payload.size, 'size不能为空');

    //获取state快照
    const state = this.snapshot;
    state.testPlanParam = payload;
    state.projectId = id;
    return this.httpClient.get<Page<TestPlan>>(`/project/getTestPlanPage/${id}`, {params: payload}).pipe(
      tap(data => {
        state.testPlanPageData = new Page<TestPlan>(data);
        this.next(state);
      }),
    );
  }

  @Action()
  getAll(): Observable<Project[]> {
    const state = this.getState();
    return this.httpClient.get<Project[]>('/project/getAll').pipe(tap(data => {
      state.getAll = data as Project[];
      this.next(state);
    }))
  }

}
