import {NgModule} from "@angular/core";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {MockApiInterceptor} from "@yunzhi/ng-mock-api";
import {UserApi} from "./user-api";
import {ProjectApi} from "./projectApi";

export const apis = [
  UserApi,
  ProjectApi
]
/**
 * 用于脱离后台跑demo
 */
@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS, multi: true, useClass: MockApiInterceptor.forRoot(apis)
    }
  ]
})
export class ApiDemoModule {
}
