import {Injectable} from '@angular/core';
import {User} from "../entity/user";
import {Action, Store} from '@tethys/store';
import {map, Observable, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

/**
 * 用户状态管理
 */
interface UserState extends Store<User> {
  currentUser: User;
}

/**
 * 用户的service
 */
@Injectable({
  providedIn: 'root'
})
export class UserService extends Store<UserState> {

  static user(state: UserState): User {
    return state.currentUser;
  }

  constructor(protected httpClient: HttpClient,
              protected router: Router) {
    super({
      currentUser: {} as User
    });

    if (!this.router.url.startsWith(`/login`)) {
      this.initCurrentLoginUser();
    }
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
    return this.httpClient.get<void>(`/user/logout`).pipe(map(() => {
      this.setCurrentLoginUser(null);
    }));
  }

  /**
   * 初始化当前登录的用户
   * @param callback
   */
  @Action()
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

  /**
   * 获取当前登录的用户
   */
  getCurrentLoginUser(): User {
    const state = this.getState();
    return state.currentUser;
  }

  setCurrentLoginUser(user: User | null): void {
    const state = this.getState();
    if (user) {
      state.currentUser = user;
    }
    this.next(state);
  }
}
