import { Injectable } from '@angular/core';
import {Action, Store} from "@tethys/store";
import {TestCase} from "../entity/test-case";
import {Page} from "@yunzhi/ng-common";
import {TestItem} from "../entity/test-item";
import {Observable, tap} from "rxjs";
import {Assert} from "@yunzhi/utils";
import {HttpClient} from "@angular/common/http";

/**
 * 测试用例小项状态管理
 */
interface TestItemState extends Store<TestItem>{
  getById: TestItem;
}
@Injectable({
  providedIn: 'root'
})
export class TestItemService extends Store<TestItemState>{

  static getById(state: TestItemState ): TestItem{
    return state.getById;
  }
  constructor(private httpClient: HttpClient) {
    super({});
  }

  @Action()
  getById(id: number): Observable<TestItem>{
    Assert.isNumber(id, 'id不是number')
    return this.httpClient.get<TestItem>(`/testItem/${id}`).pipe(tap(data => {
      const state = this.getState();
      state.getById = data as TestItem;
      this.next(state);
    }));
  }

  addTestItem(testItem: {name: string, steps: string, expectedResult: string, testCase: TestCase}): Observable<TestItem>{
    Assert.isNotNullOrUndefined(testItem, 'testItem不能为空')
    return this.httpClient.post<TestItem>('/testItem', testItem);
  }

  deleteTestItem(id: number): Observable<void> {
    Assert.isNumber(id, 'id类型不正确');
    return this.httpClient.delete<void>(`/testItem/${id}`);
  }

  updateTestItem(id: number, testItem: {name: string, steps: string, expectedResult: string }): Observable<TestItem>{
    return this.httpClient.put<TestItem>(`/testItem/${id}`, testItem);
  }
}
