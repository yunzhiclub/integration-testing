import { Injectable } from '@angular/core';
import {Action, Store} from "@tethys/store";
import {TestCase} from "../entity/test-case";
import {Page} from "@yunzhi/ng-common";
import {Test} from "../entity/test";
import {Project} from "../entity/project";
import {Observable, tap} from "rxjs";
import {Assert} from "@yunzhi/utils";
import {HttpClient} from "@angular/common/http";

/**
 * 测试的状态管理
 */
interface TestState extends Store<Test>{
  pageData: Page<Test>;
  httpParams: { page: number, size: number };

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
      httpParams: {page: 0, size: 0}
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
}
