import { Injectable } from '@angular/core';
import {Action, Store } from '@tethys/store';
import {Page} from "@yunzhi/ng-common";
import {Observable, tap} from "rxjs";
import {Assert} from "@yunzhi/utils";
import {HttpClient} from "@angular/common/http";
import {TestCase} from "../entity/test-case";

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
  deleteAction(id: number): Observable<void> {
    Assert.isNumber(id, 'id类型不正确');
    return this.httpClient.delete<void>(`/testCase/${id}`).pipe(tap(() => {
      const state = this.getState();
      state.pageData.content = state.pageData.content.filter(testCase => testCase.id !== id);
      this.next(state);

      this.pageAction(state.httpParams);
    }));
  }
}
