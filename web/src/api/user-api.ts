import {ApiInjector, MockApiInterface} from "@yunzhi/ng-mock-api";
import {randomNumber, randomString} from "@yunzhi/utils";
import {User} from "../entity/user";
import {HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {HttpErrorResponse} from "@yunzhi/ng-common";

/**
 * 用户Mock数据
 */
export class UserApi implements MockApiInterface {
  private sessionKey = 'currentLoginUser';

  getInjectors(): ApiInjector[] {
    return [
      {
        url: '/user/login',
        method: 'GET',
        description: '登录',
        result: (urlMatches: any, options: { headers: HttpHeaders }) => {
          const auth = options.headers.get('Authorization');
          if (auth === null) {
            const xAuthToken = options.headers.get('x-auth-token');
            if (xAuthToken === null) {
              return new Observable<HttpErrorResponse>(subscriber => {
                subscriber.error(new HttpErrorResponse({status: 401}));
                subscriber.complete();
              });
            } else {
              return {};
            }
          } else {
            const auths = atob(auth!.substring(6)).split(':');

            const username = auths[0];
            const password = auths[1];
            //设定为用户名不为null 密码为yunzhi 可登录
            if (username !== null && password === 'yunzhi') {
              const user = {
                id: randomNumber(),
                username,
                password,
              } as User;
              // 设置user基本信息
              user.name = randomString('姓名');
              this.setCurrentLoginUser(user);
              return user;
            } else {
              return new Observable<HttpErrorResponse>(subscriber => {
                subscriber.error(new HttpErrorResponse({status: 401}));
                subscriber.complete();
              });
            }
          }
        }
      },
      {
        method: 'GET',
        url: '/user/currentLoginUser',
        description: '获取当前登录用户',
        result: () => {
          return {
            id: randomNumber(20),
            name: randomString(),
            username: randomString()
          } as User
        }
      },
    ];
  }

  /**
   * 设置当前登录用户
   * @param user 用户
   */
  private setCurrentLoginUser(user: User): void {
    localStorage.setItem(this.sessionKey, JSON.stringify(user));
  }
}
