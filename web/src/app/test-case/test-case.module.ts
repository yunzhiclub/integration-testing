import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestCaseRoutingModule } from './test-case-routing.module';
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    TestCaseRoutingModule
  ]
})
export class TestCaseModule { }
