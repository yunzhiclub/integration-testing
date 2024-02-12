import { Injectable } from '@angular/core';
import {Action, Store} from "@tethys/store";
import {Page} from "@yunzhi/ng-common";
import {Test} from "../entity/test";
import {Observable, tap} from "rxjs";
import {Assert} from "@yunzhi/utils";
import {HttpClient} from "@angular/common/http";
import {TestItem} from "../entity/test-item";

/**
 * 测试的状态管理
 */
interface TestState extends Store<Test>{
  pageData: Page<Test>;
  httpParams: { page: number, size: number };
  getById: Test;
}
@Injectable({
  providedIn: 'root'
})
export class TestService extends Store<TestState>{
  static pageData(state: TestState): Page<Test> {
    return state.pageData;
  }
  constructor(private httpClient: HttpClient) {
    super({
      pageData: new Page<Test>(),
      httpParams: {page: 0, size: 0},
      getById: null
    });
  }

  /**
   * 分页数据
   */
  @Action()
  pageAction(payload: {page: number, size: number}): Observable<Page<Test>> {
    Assert.isNumber(payload.page, 'page不能为空');
    Assert.isNumber(payload.size, 'size不能为空');

    //获取state快照
    const state = this.snapshot;
    state.httpParams = payload;

    return this.httpClient.get<Page<Test>>('/test/page', {params: payload})
      .pipe(
        tap(data => {
          Assert.isNotNullOrUndefined(data, '返回的数据不能为空或未定义');

          state.pageData = data as Page<Test>;
          this.next(state);
        }),
      );
  }

  /**
   * 获取测试用例小项目
   * @param testId
   */
  @Action()
  getTestById(testId: number): Observable<Test>{
    Assert.isNumber(testId, 'testId不是整数');

    return this.httpClient.get<Test>(`/getTestById/${testId}`).pipe(tap(data => {
      Assert.isNotNullOrUndefined(data, '返回的数据不能为空或未定义');

      const state = this.getState();
      state.getById = data as Test;
      this.next(state);
    }));
  }
}
