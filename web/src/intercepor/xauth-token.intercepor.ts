import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponseBase} from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';

/**
 * token 拦截器
 */
@Injectable()
export class XauthTokenIntercepor implements HttpInterceptor {

  private static token = window.sessionStorage.getItem('x-auth-token');

  constructor() {
  }

  /**
   * 设置token，如果没有什么都不做
   *
   * @param xAuthToken
   */
  public static setToken(xAuthToken: string): void {
    if (xAuthToken && this.token !== xAuthToken) {
      this.token = xAuthToken;
      window.sessionStorage.setItem('x-auth-token', xAuthToken);
    }
  }

  /**
   * 清除token
   */
  public static clearToken(): void {
    this.token = null;
    window.sessionStorage.removeItem('x-auth-token');
  }

  /**
   * 获取当前token
   */
  public static getToken(): string | number | null {
    return XauthTokenIntercepor.token;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (XauthTokenIntercepor.token !== null) {
      request = request.clone({setHeaders: {'x-auth-token': XauthTokenIntercepor.token}});
    }

    return next.handle(request).pipe(catchError((err: any) => {
      return throwError(err);
    },), tap(input => {
      if (input instanceof HttpResponseBase) {
        const httpHeader = input.headers;
        const xAuthToken = httpHeader.get('x-auth-token');

        if (xAuthToken !== null) {
          XauthTokenIntercepor.setToken(xAuthToken);
        }
      }
    }));
  }
}
