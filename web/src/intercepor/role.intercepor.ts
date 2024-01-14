import {HttpErrorInterceptor} from "@yunzhi/ng-common";
import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

/**
 * 角色拦截器
 */
@Injectable()
export class RoleInterceptor extends HttpErrorInterceptor {

  constructor() {
    super();
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('xAuthTokenInterceptor is called');
    return next.handle(request);
  }
}
