import { Injectable } from '@angular/core';
import {User} from "../entity/user";
import {Action, Store} from '@tethys/store';
import {Observable, ReplaySubject, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

/**
 * 用户状态管理
 */
interface UserState extends Store<User> {

}

/**
 * 用户的service
 */
@Injectable({
  providedIn: 'root'
})
export class UserService extends Store<UserState>{
  // public currentLoginUser: User;
  private currentLoginUser$ = new ReplaySubject<User>(1);

  constructor(protected httpClient: HttpClient,
              protected router: Router) {
    super({});

    if (!this.router.url.startsWith(`/login`)) {
      this.initCurrentLoginUser();
    }
  }

  login(user: { username: string; password: string }): Observable<User> {
    user = user as User;
    let headers = new HttpHeaders();

    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded')
    headers = headers.append('Authorization',
      'Basic ' + btoa(user.username + ':' + encodeURIComponent(user.password)));
    // 发起get请求并返回
    return this.httpClient.get<User>(`/user/login`, {headers})
      .pipe(tap(data => this.setCurrentLoginUser(data)));
  }

  /**
   * 请求当前登录用户
   * @param callback
   */
  initCurrentLoginUser(callback?: () => void) {
    setTimeout(() => {
      this.httpClient.get<User>('/user/currentLoginUser')
        .subscribe({
          next: (user: User) => {
            this.setCurrentLoginUser(user);
          }, error: () => {
            this.router.navigateByUrl('/login').then();
          }, complete: () => {
            if (callback) {
              callback();
            }
          }
        });
    });
  }

  getCurrentLoginUser$(): Observable<User> {
    return this.currentLoginUser$;
  }

  setCurrentLoginUser(user: User): void {
    // this.currentLoginUser = user;
    this.currentLoginUser$.next(user);
  }
}
