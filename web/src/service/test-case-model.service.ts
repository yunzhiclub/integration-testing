import { Injectable } from '@angular/core';
import {Action, Store} from "@tethys/store";
import {Page} from "@yunzhi/ng-common";
import {TestCaseModel} from "../entity/test-case-model";
import {Observable, tap} from "rxjs";
import { Assert } from '@yunzhi/utils';
import {HttpClient} from "@angular/common/http";
import * as _ from "lodash";

/**
 * 测试用例模型的状态管理
 */
interface TestCaseModelState extends Store<TestCaseModel>{
  pageData: Page<TestCaseModel>;
  getById: TestCaseModel;
  httpParam: {size: number, page: number}
}

@Injectable({
  providedIn: 'root'
})
export class TestCaseModelService extends Store<TestCaseModelState>{

  static pageData(state: TestCaseModelState): Page<TestCaseModel>{
    return state.pageData;
  }

  static getById(state: TestCaseModelState): TestCaseModel {
    return  state.getById;
  }

  constructor(private httpClient: HttpClient) {
    super({
      pageData: new Page<TestCaseModel>({}),
      getById: null,
      httpParam: {size: 0, page: 0}
    });
  }

  /**
   * 分页数据
   */
  @Action()
  pageAction(payload: {page: number, size: number}): Observable<Page<TestCaseModel>> {
    Assert.isNumber(payload.page, 'page不能为空');
    Assert.isNumber(payload.size, 'size不能为空');

    //获取state快照
    const state = this.snapshot;
    return this.httpClient.get<Page<TestCaseModel>>('/testCaseModel/page', {params: payload})
      .pipe(
        tap(data => {
          state.pageData = data as Page<TestCaseModel>;
          this.next(state);
        }),
      );
  }

  @Action()
  getById(id: number): Observable<TestCaseModel>{
    Assert.isNumber(id, 'id类型不正确');
    return this.httpClient.get<TestCaseModel>(`/testCaseModel/${id}`).pipe(tap(data => {
      const state = this.getState();
      state.getById = data as TestCaseModel;
      this.next(state);
    }))
  }

  toggleCollapse(id: number, isShow: Boolean): Observable<TestCaseModel> {
    Assert.isNumber(id, 'id不能为空');
    return this.httpClient.put<TestCaseModel>(`/testCaseModel/${id}`, isShow).pipe(tap(value => {
      const state = this.getState();
      const testCaseModel = _.find(state.pageData.content, {id}) as TestCaseModel;
      if (testCaseModel) {
        testCaseModel.isShow = !isShow;
      }

      this.next(state);
      // this.pageAction(state.httpParam);
    }));
  }

}
