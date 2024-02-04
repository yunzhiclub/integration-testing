import {Injectable} from '@angular/core';
import {Action, Store} from "@tethys/store";
import {Project} from "../entity/project";
import {Page} from "@yunzhi/ng-common";
import {TestPlan} from "../entity/testPlan";
import {Observable, tap} from "rxjs";
import {Assert} from "@yunzhi/utils";
import {HttpClient} from "@angular/common/http";
import {TestCase} from "../entity/test-case";
import {User} from "../entity/user";
import {Task} from "../entity/task";
import {TestPlanRoutingModule} from "../app/test-plan/test-plan-routing.module";

interface TestPlanState extends Store<TestPlan> {
  pageData: Page<TestPlan>;
  httpParams: { page: number, size: number, name?: string };
  getById: TestPlan;
}

@Injectable({
  providedIn: 'root'
})
export class TestPlanService extends Store<TestPlanState> {
  static pageData(state: TestPlanState): Page<TestPlan> {
    return state.pageData;
  }

  static getById(state: TestPlanState): TestPlan {
    return state.getById;
  }

  constructor(private httpClient: HttpClient) {
    super({
      pageData: new Page<TestPlan>({}),
      httpParams: {page: 0, size: 0, name: ''},
      getById: {} as TestPlan
    });
  }

  /**
   * 分页数据
   */
  @Action()
  pageAction(payload: { page: number, size: number, name?: string }): Observable<Page<TestPlan>> {
    Assert.isNumber(payload.page, 'page不能为空');
    Assert.isNumber(payload.size, 'size不能为空');

    //获取state快照
    const state = this.snapshot;
    state.httpParams = payload;
    return this.httpClient.get<Page<TestPlan>>('/testPlan/page', {params: payload})
      .pipe(
        tap(data => {
          state.pageData = data as Page<TestPlan>;
          this.next(state);
        }),
      );
  }

  @Action()
  addAction(testPlan: { project: Project, title: string }): Observable<TestPlan> {
    Assert.isNotNullOrUndefined(testPlan.title);
    Assert.isNotNullOrUndefined(testPlan.project);

    testPlan = testPlan as TestPlan;
    return this.httpClient.post<TestPlan>('/testPlan', testPlan).pipe(tap(value => {
      const state = this.getState();
      state.pageData.content.unshift(value as TestPlan);

      this.next(state);
    }));
  }

  @Action()
  deleteAction(id: number): Observable<void> {
    Assert.isNumber(id, 'id类型不正确');
    return this.httpClient.delete<void>(`/testPlan/${id}`).pipe(tap(() => {
      const state = this.getState();
      state.pageData.content = state.pageData.content.filter(testPlan => testPlan.id !== id);
      this.next(state);

      this.pageAction(state.httpParams);
    }));
  }


  @Action()
  batchAddTestPlan(batchTestPlan: { project: Project, title: string, tasks: Task[] }): Observable<TestPlan[]> {
    Assert.isNotNullOrUndefined(batchTestPlan.title);
    Assert.isNotNullOrUndefined(batchTestPlan.project);

    return this.httpClient.post<TestPlan[]>('/testPlan/batchTestPlan', batchTestPlan).pipe(tap(value => {
      const state = this.getState();
      value.forEach(v => {
        state.pageData.content.unshift(v);
      })
      this.next(state);
    }));
  }

  /**
   * 根据id获取测试计划
   * @param id
   */
  @Action()
  getById(id: number): Observable<TestPlan> {
    return this.httpClient.get<TestPlan>(`/testPlan/${id}`).pipe(tap(data => {
      Assert.isNotNullOrUndefined(data, '数据不能为空')

      const state = this.snapshot;
      state.getById = data as TestPlan;
      this.next(state);
    }))
  }
}
