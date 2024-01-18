import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { IndexComponent } from './index/index.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";
import { TestItemComponent } from './test-item/test-item.component';

/**
 * 测试管理模块
 */
@NgModule({
  declarations: [
    IndexComponent,
    TestItemComponent
  ],
  imports: [
    CommonModule,
    TestRoutingModule,
    FormsModule,
    MatTooltipModule,
    ReactiveFormsModule
  ]
})
export class TestModule { }
