import {ApiInjector, MockApiInterface, RequestOptions} from "@yunzhi/ng-mock-api";
import {Assert, randomNumber, randomString} from "@yunzhi/utils";
import {User} from "../entity/user";
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {generatePage, HttpErrorResponse} from "@yunzhi/ng-common";

/**
 * 用户Mock数据
 */
export class UserApi implements MockApiInterface {
  private sessionKey = 'currentLoginUser';

  private names = ["张三", "李四", "李白", "杜甫"];

  static currentLoginUser = {
    id: randomNumber(1),
    name: randomString('name'),
    username: randomString('username'),
    dirtyContactPhone: '1390****234',
    role: 'role_admin'
  } as User;

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
                id: randomNumber(100),
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
          return this.getCurrentLoginUser();
        }
      },
      {
        method: 'GET',
        url: `/user/logout`,
        description: '退出当前登录',
        result: () => {
          if (this.getCurrentLoginUser() !== null) {
            this.clearCurrentLoginUser();
            return null;
          } else {
            return new Observable<HttpErrorResponse>(subscriber => {
              subscriber.next(new HttpErrorResponse({status: 401}));
              subscriber.complete();
            });
          }
        }
      },
      {
        method: 'GET',
        url: '/user/page',
        result: (urlMatcher: any, options: RequestOptions) => {
          const params = options.params as HttpParams;

          const page = +params.get('page');
          const size = +params.get('size');
          // const page = 0;
          // const size = 10;
          const name = params.get('name') ? params.get('name') : ""

          return generatePage<User>(page, size, index => {
            return {
              id: randomNumber(100),
              name: name ? randomString(name, 2) : randomString(this.names[Math.floor(Math.random() * this.names.length)]),
              contactPhone: randomString('18100000000'),
              dirtyContactPhone: randomString('181****0000'),
              username: randomString('0304210123'),
              password: randomString('yunzhi'),
              role: 'role_user'
            } as User;
          });
        }
      },
      {
        method: 'POST',
        url: '/user',
        result: (urlMatcher: any, options: {body: {name: string, username: string, contactPhone: string, role: string}}) => {
          const user = options.body as User;
          return {
            id: randomNumber(10),
            name: user.name,
            username: user.username,
            dirtyContactPhone: '181****0000',
            role: user.role
          } as User
        }
      },
      {
        url: '/user/(\\d+)',
        method: 'GET',
        result: (urlMatcher: any) => {
          const id = urlMatcher['id'] ? +urlMatcher['id'] : randomNumber(10);
          return this.getOneUserById(id);
        }
      },
      {
        url: '/user/(\\d+)',
        method:  'PUT',
        result: (urlMatcher: string[], options: {body: {name: string, username: string, contactPhone: string}}) => {
          const user = options.body as User;
          const id = +urlMatcher[1];
          return {
            id,
            name: user.name,
            username: user.username,
            dirtyContactPhone: '181****0000',
            role: 'role_user'
          } as User
        }
      },
      {
        url: '/user/(\\d+)',
        method: 'DELETE',
      },
      {
        url: '/user/resetPassword/(\\d+)',
        method: 'PUT',
        result: randomString('', 6)
      },
    ];
  }

  /**
   * 清除当前登录用户
   */
  private clearCurrentLoginUser(): void {
    localStorage.removeItem(this.sessionKey);
  }

  getCurrentLoginUser(): User | undefined {
    if(localStorage.getItem(this.sessionKey)) {
      return  UserApi.currentLoginUser;
    }
    return undefined;
  }

  /**
   * 设置当前登录用户
   * @param user 用户
   */
  private setCurrentLoginUser(user: User): void {
    localStorage.setItem(this.sessionKey, JSON.stringify(user));
  }

  getOneUserById(id: number): User {
    return {
      id,
      username: randomString('username', 4),
      name: randomString('name', 4),
      contactPhone: '13800138000',
      dirtyContactPhone: '13800138000',
      role: 'role_user'
    } as User;
  }

}
