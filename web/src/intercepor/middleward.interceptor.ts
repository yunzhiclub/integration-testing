import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {MockApiInterceptor} from "@yunzhi/ng-mock-api";
import {environment} from "../environments/environment";

/**
 * 中间件拦截器
 * 当后台未启动或者接口尚未开发时，调用模拟数据
 * 注意：在启动后台时，首先要保证后台拥有用户登录功能
 */
@Injectable()
export class MiddlewareInterceptor implements HttpInterceptor {

  constructor(private mockApiInterceptor: MockApiInterceptor) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      if (error && [404, 405].includes(error.status)) {
        if (req.url.startsWith(environment.apiUrl)) {
          const url = req.url.substring(environment.apiUrl.length);
          req = req.clone({url});
        }
        return this.mockApiInterceptor.intercept(req, next);
      } else {
        return throwError(error);
      }
    }));
  }

}
