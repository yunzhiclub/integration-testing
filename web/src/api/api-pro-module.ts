
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {
  ApiPrefixAndMergeMapInterceptor,
  NullOrUndefinedOrEmptyInterceptor,
  Prevent401Popup,
} from "@yunzhi/ng-common";
import {XauthTokenIntercepor} from "../intercepor/xauth-token.intercepor";
import {MockApiInterceptor} from "@yunzhi/ng-mock-api";
import {apis} from "./api.demo.module";
import {MiddlewareInterceptor} from "../intercepor/middleward.interceptor";
/**
 *  启动后台使用
 */
@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixAndMergeMapInterceptor.forRoot({api: '/api'}),
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NullOrUndefinedOrEmptyInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Prevent401Popup,
      multi: true
    },
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: XauthTokenIntercepor
    },
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: MiddlewareInterceptor
    },
    MockApiInterceptor.forRoot(apis)
  ]
})
export class ApiProModule {
}
