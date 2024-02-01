import {Injectable, OnInit} from '@angular/core';
import {Action, Store} from "@tethys/store";
import {TestCase} from "../entity/test-case";
import {TestItem} from "../entity/test-item";
import {Observable, tap} from "rxjs";
import {Assert} from "@yunzhi/utils";
import {HttpClient} from "@angular/common/http";
import {TestCaseService} from "./test-case.service";

/**
 * 测试用例小项状态管理
 */
interface TestItemState extends Store<TestItem>{
  getById: TestItem;

}
@Injectable({
  providedIn: 'root'
})
export class TestItemService extends Store<TestItemState> {

  static getById(state: TestItemState): TestItem {
    return state.getById;
  }

  constructor(private httpClient: HttpClient,
              private testCaseService: TestCaseService) {
    super({getById: null});
  }

  @Action()
  getById(id: number): Observable<TestItem> {
    Assert.isNumber(id, 'id不是number')
    return this.httpClient.get<TestItem>(`/testItem/${id}`).pipe(tap(data => {
      const state = this.getState();
      state.getById = data as TestItem;
      this.next(state);
    }));
  }

  @Action()
  addTestItem(testCaseId: number, testItem: {
    name: string,
    steps: string,
    expectedResult: string,
    testCase: TestCase
  }): Observable<TestItem> {
    Assert.isNumber(testCaseId, 'testCaseId类型不正确')
    Assert.isNotNullOrUndefined(testItem, 'testItem不能为空')

    return this.httpClient.post<TestItem>('/testItem', testItem).pipe(tap(data => {
      const state = this.testCaseService.snapshot;
      const testCase = state.pageData.content.find(v => v.id === testCaseId);

      if (testCase) {
        testCase.testItems.unshift(data);
        this.testCaseService.next(state);
      }
    }));
  }

  @Action()
  deleteTestItem(testCaseId: number, testItemId: number): Observable < void > {
    Assert.isNumber(testItemId, 'testItemId类型不正确');
    Assert.isNumber(testCaseId, 'testCaseId类型不正确');

    return this.httpClient.delete<void>(`/testItem/${testItemId}`).pipe(tap(() => {
      const state = this.testCaseService.snapshot;
      const testCase = state.pageData.content.find(v => {
        return testCaseId === v.id;
      })
      testCase.testItems.filter(v => v.id === testItemId);

      this.testCaseService.next(state);
    }));
  }

  @Action()
  updateTestItemAction(testCaseId: number, testItemId: number, testItem: { name: string, steps: string, expectedResult: string }): Observable < TestItem > {
    return this.httpClient.put<TestItem>(`/testItem/${testItemId}`, testItem).pipe(tap((data) => {
      this.updateTestItem(testCaseId, testItemId, data);
    }));
  }

  /**
   * 修改后的新值testItem替换旧值testItem
   * @param testCaseId
   * @param testItemId
   * @param testItem
   */
  updateTestItem(testCaseId: number, testItemId: number, testItem: TestItem): void {
    const  state = this.testCaseService.snapshot;
    const testCase = state.pageData.content.find(v => {
      return v.id === testCaseId;
    });
    const data = testCase.testItems.find(value => {
      return value.id === testItemId;
    })
    if(data !== null) {
    const index = testCase.testItems.indexOf(data)
    testCase.testItems.splice(index, 1, testItem)
    this.testCaseService.next(state);
    }
  }

}
