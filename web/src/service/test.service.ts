import { Injectable } from '@angular/core';
import {Action, Store} from "@tethys/store";
import {Page} from "@yunzhi/ng-common";
import {Test} from "../entity/test";
import {Observable, tap} from "rxjs";
import {Assert} from "@yunzhi/utils";
import {HttpClient} from "@angular/common/http";
import { UserService } from './user.service';
import { User } from 'src/entity/user';
import * as _ from 'lodash';

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
  private currentUser: User;

  static pageData(state: TestState): Page<Test> {
    return state.pageData;
  }

  constructor(private httpClient: HttpClient,
              private userService: UserService) {
    super({
      pageData: new Page<Test>(),
      httpParams: {page: 0, size: 0},
      getById: null
    });

    this.getCurrentUser();
  }

  /**
   * 分页数据
   */
  @Action()
  pageAction(payload: {page: number, size: number}): Observable<Page<Test>> | void {
    Assert.isNumber(payload.page, 'page不能为空');
    Assert.isNumber(payload.size, 'size不能为空');

    // 获取state快照
    const state = this.snapshot;
    state.httpParams = payload;

    // 根据当前登录用户的角色判断请求接口
    if(this.currentUser.role === 'role_user') {
      const currentUserId = this.currentUser.id;
      return this.httpClient.get<Page<Test>>(`/test/page/${currentUserId}`, {params: payload})
      .pipe(
        tap(data => {
          Assert.isNotNullOrUndefined(data, '返回的数据不能为空或未定义');

          state.pageData = data as Page<Test>;
          this.next(state);
        }),
      );
    } 

    if(this.currentUser.role === 'role_admin') {
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

  @Action()
  toggleCollapse(id: number): Observable<boolean> {
    Assert.isNumber(id, 'id不能为空');

    return this.httpClient.get<boolean>(`/test/toggleCollapse/${id}`).pipe(tap(value => {
      const state = this.getState();
      const test = _.find(state.pageData.content, {id}) as Test;
      if (test) {
        test.isShow = value;
      }
      // this.next(state);
      // this.pageAction(state.httpParams);
    }));
  }


  /**
   * 获取当前登录用户
   */
  getCurrentUser(): void{
    this.userService.select(UserService.currentUser).subscribe(currentUser => {
      if(currentUser) {
        this.currentUser = currentUser as User;
      }
    })
  }
}
