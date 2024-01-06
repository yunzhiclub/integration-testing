import {Injectable} from '@angular/core';
import {User} from "../entity/user";
import {Action, Store} from '@tethys/store';
import {map, Observable, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Page} from "@yunzhi/ng-common";
import {Assert} from "@yunzhi/utils";
import * as _ from "lodash";

/**
 * 用户状态管理
 */
interface UserState extends Store<User> {
  currentUser: User;
  pageData: Page<User>;
  httpParams: {page: number, size: number, name?: string};
  getById: User;
}

/**
 * 用户的service
 */
@Injectable({
  providedIn: 'root'
})
export class UserService extends Store<UserState> {

  static user(state: UserState): User{
    return state.currentUser;
  }

  static getById(status: UserState): User {
    return status.getById;
  }

  static pageData(state: UserState): Page<User> {
    return state.pageData;
  }
  constructor(protected httpClient: HttpClient,
              protected router: Router) {
    super({
      currentUser: {} as User,
      pageData: new Page<User>(),
      httpParams: {page: 0, size: 0, name: ''}
    });

    if (!this.router.url.startsWith(`/login`)) {
     this.initCurrentLoginUser();
    }
  }

  @Action()
  addAction(user: {name: string, username: string, contactPhone: string}): Observable<User> {
    Assert.isNotNullOrUndefined(user.name);
    Assert.isNotNullOrUndefined(user.username);
    Assert.isNotNullOrUndefined(user.contactPhone);

    user = user as User;
    return this.httpClient.post<User>('/user', user).pipe(tap(value => {
      const state = this.getState();
      state.pageData.content.unshift(value as User);

      this.next(state);
    }));
  }

  @Action()
  deleteAction(id: number): Observable<void> {
    Assert.isNumber(id, 'id类型不正确');
    return this.httpClient.delete<void>(`/user/${id}`).pipe(tap(() => {
      const state = this.getState();
      state.pageData.content = state.pageData.content.filter(user => user.id !== id);
      this.next(state);

      this.pageAction(state.httpParams);
    }));
  }

  @Action()
  getById(id: number): Observable<User> {
    Assert.isNumber(id, 'id类型不正确');
    return this.httpClient.get<User>(`/user/${id}`).pipe(tap(data => {
      const state = this.getState();
      state.getById = data as User;
      this.next(state);
    }))
  }

  @Action()
  resetPassword(id: number): Observable<string> {
    Assert.isNumber(id, 'id类型不正确');
    return this.httpClient.put<string>(`/user/resetPassword/${id}`, {})
  }
  @Action()
  updateAction(id: number, user: {name: string, username: string, contactPhone: string}): Observable<User> {
    Assert.isNumber(id, 'id类型不正确');
    Assert.isNotNullOrUndefined(user.name);
    Assert.isNotNullOrUndefined(user.username);
    Assert.isNotNullOrUndefined(user.contactPhone);

    user = user as User;
    return this.httpClient.put<User>(`/user/${id}`, user).pipe(tap(value => {
      const state = this.getState();
      user = _.find(state.pageData.content, {id}) as User;
      if (user) {
        user.name = value.name;
        user.name = value.name;
      }

      this.next(state);
      this.pageAction(state.httpParams);
    }));
  }

  /**
   * 分页数据
   */
  @Action()
  pageAction(payload: {page: number, size: number, name?: string}): Observable<Page<User>> {
    Assert.isNumber(payload.page, 'page不能为空');
    Assert.isNumber(payload.size, 'size不能为空');
    console.log('payload', payload)
    //获取state快照
    const state = this.snapshot;
    state.httpParams = payload;
    return this.httpClient.get<Page<User>>('/user/page', {params: payload})
      .pipe(
        tap(data => {
          state.pageData = data as Page<User>;
          this.next(state);
        }),
      );
  }

  /**
   * 用户名密码进行登录 basic加密用户名和密码
   * @param user
   */
  @Action()
  login(user: { username: string; password: string }): Observable<User> {
    user = user as User;
    let headers = new HttpHeaders();

    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded')
    headers = headers.append('Authorization',
      'Basic ' + btoa(user.username + ':' + encodeURIComponent(user.password)));
    // 发起get请求并返回
    return this.httpClient.get<User>(`/user/login`, {headers})
      .pipe(tap(data => {
        this.setCurrentLoginUser(data);
      }));
  }

  /**
   * 退出系统
   */
  @Action()
  logout(): Observable<void> {
    return this.httpClient.get<void>(`/user/logout`);
  }

  /**
   * 初始化当前登录的用户
   *
   */
  @Action()
  initCurrentLoginUser():Observable<void>{
    return this.httpClient.get<User>('/user/currentLoginUser').pipe(map( data => {
      /*存在当前登录的用户，更新状态 否则跳转登录界面*/
      if (data) {
        const state = this.getState();
        state.currentUser = data as User;
        this.next(state);
      } else {
        this.router.navigateByUrl('login').then();
      }
    }));
  }

  /**
   * 获取当前登录的用户
   */

  setCurrentLoginUser(user: User): void {
    const state = this.getState();
    if (user) {
      state.currentUser = user;
    }
    this.next(state);
  }
}
