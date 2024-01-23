import {NgModule} from "@angular/core";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {MockApiInterceptor} from "@yunzhi/ng-mock-api";
import {UserApi} from "./user-api";
import {ProjectApi} from "./projectApi";
import {TestPlanApi} from "./testPlan-api";
import {TestCaseApi} from "./testCase-api";
import {TestCaseModelApi} from "./testCaseModel-api";

export const apis = [
    UserApi,
    ProjectApi,
    TestPlanApi,
    TestCaseApi,
  TestCaseModelApi
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
