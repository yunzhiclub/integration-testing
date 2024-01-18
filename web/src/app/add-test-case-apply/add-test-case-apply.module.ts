import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddTestCaseApplyRoutingModule } from './add-test-case-apply-routing.module';
import { IndexComponent } from './index/index.component';
import {MatTooltipModule} from "@angular/material/tooltip";


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
