import {Injectable} from '@angular/core';
import {TestPlan} from "../entity/testPlan";
import {Page} from "@yunzhi/ng-common";
import {Action, Store} from "@tethys/store";
import {Observable, tap} from "rxjs";
import {Assert} from "@yunzhi/utils";
import {HttpClient} from "@angular/common/http";

/**
 * 测试计划状态
 */
interface TestPlanState extends Store<TestPlan>{
  pageData: Page<TestPlan>;
  httpParams: {page: number, size: number};
  getById: TestPlan;
  projectId: number;
}
@Injectable({
  providedIn: 'root'
})
export class TestPlanService extends Store<TestPlanState>{

  static testPlanPage(state: TestPlanState): Page<TestPlanState> {
    return state.usersPageData;
  }

  constructor(private httpClient: HttpClient) {
    super({});
  }

  @Action()
  PageAction(id: number, param: {size: number, page: number, name?: string}): Observable<Page<TestPlan>>{
    Assert.isNumber(param.page, 'page不能为空');
    Assert.isNumber(param.size, 'size不能为空');

    //获取state快照
    const state = this.snapshot;
    state.httpParams = param;
    state.projectId = id;
    return this.httpClient.get<Page<TestPlan>>(`/project/getTestPlanPage/${id}`, {params: param}).pipe(
      tap(data => {
        state.pageData = new Page<TestPlan>(data);
        this.next(state);
      }),
    );
  }
}
