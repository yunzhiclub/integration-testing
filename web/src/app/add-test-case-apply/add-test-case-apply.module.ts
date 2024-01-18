import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddTestCaseApplyRoutingModule } from './add-test-case-apply-routing.module';
import { IndexComponent } from './index/index.component';
import {MatTooltipModule} from "@angular/material/tooltip";

/**
 * 补充测试用例申请模块
 */
@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    AddTestCaseApplyRoutingModule,
    MatTooltipModule
  ]
})
export class AddTestCaseApplyModule { }
