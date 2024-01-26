import { Injectable } from '@angular/core';
import {Action, Store } from '@tethys/store';
import {Page} from "@yunzhi/ng-common";
import {Observable, tap} from "rxjs";
import {Assert} from "@yunzhi/utils";
import {HttpClient} from "@angular/common/http";
import {TestCase} from "../entity/test-case";
import {Project} from "../entity/project";
import * as _ from "lodash";

/**
 * 测试用例的状态管理
 */
interface TestCaseState extends Store<TestCase>{
  pageData: Page<TestCase>;
  httpParams: {page: number, size: number};
  getById: TestCase,
}
@Injectable({
  providedIn: 'root'
})
export class TestCaseService extends Store<TestCaseState>{

  static pageData(state: TestCaseState): Page<TestCase>{
    return state.pageData;
  }

  static getById(state: TestCaseState): TestCase{
    return state.getById;
  }

  constructor(private httpClient: HttpClient) {
    super({
      pageData: new Page<TestCase>({}),
      httpParams: {page: 0, size: 0,},
      getById: null,
    });
  }

  /**
   * 分页数据
   */
  @Action()
  pageAction(payload: {page: number, size: number}): Observable<Page<TestCase>> {
    Assert.isNumber(payload.page, 'page不能为空');
    Assert.isNumber(payload.size, 'size不能为空');

    //获取state快照
    const state = this.snapshot;
    state.httpParams = payload;
    return this.httpClient.get<Page<TestCase>>('/testCase/page', {params: payload})
      .pipe(
        tap(data => {
          state.pageData = data as Page<TestCase>;
          this.next(state);
        }),
      );
  }

  @Action()
  addAction(testCase: {project: Project, name: string, testPurpose: string, preconditions: string}): Observable<TestCase> {
    Assert.isNotNullOrUndefined(testCase, '测试用例不能为空');
    return this.httpClient.post<TestCase>('/testCase', testCase).pipe(tap( data => {
      const testCase = data;
      const state = this.getState();
      state.pageData.content.unshift(testCase as TestCase);
      this.next(state);
    }) )
  }

  @Action()
  deleteAction(id: number): Observable<void> {
    Assert.isNumber(id, 'id类型不正确');
    return this.httpClient.delete<void>(`/testCase/${id}`).pipe(tap(() => {
      const state = this.getState();
      state.pageData.content = state.pageData.content.filter(testCase => testCase.id !== id);
      this.next(state);

      this.pageAction(state.httpParams);
    }));
  }

  @Action()
  getById(id: number): Observable<TestCase>{
    Assert.isNumber(id, 'id类型不正确');
    return this.httpClient.get<TestCase>(`/testCase/${id}`).pipe(tap(data => {
      const state = this.getState();
      state.getById = data as TestCase;
      this.next(state);
    }))
  }

  @Action()
  updateAction(id: number, testCase: {name: string, testPurpose: string, preconditions: string, project: Project}): Observable<TestCase>{
    Assert.isNumber(id, 'id类型不是Number');
    Assert.isNotNullOrUndefined(testCase);

    testCase = testCase as TestCase;
    return this.httpClient.put<TestCase>(`/testCase/${id}`, testCase).pipe(tap(value => {
      const state = this.getState();
      testCase = _.find(state.pageData.content, {id}) as TestCase;
      if (testCase) {
        testCase.name = value.name;
        testCase.testPurpose = value.testPurpose;
        testCase.preconditions = value.preconditions;
        testCase.project = value.project;
      }

      this.next(state);
      this.pageAction(state.httpParams);
    }));
  }

  @Action()
  toggleCollapse(id: number, isShow: Boolean): Observable<TestCase> {
    Assert.isNumber(id, 'id不能为空');
    return this.httpClient.put<TestCase>(`/testCase/toggleCollapse/${id}`, isShow).pipe(tap(value => {
      const state = this.getState();
      const testCase = _.find(state.pageData.content, {id}) as TestCase;
      if (testCase) {
        testCase.isShow = !isShow;
      }

      this.next(state);
      // this.pageAction(state.httpParam);
    }));
  }
}
