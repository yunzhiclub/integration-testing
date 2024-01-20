import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { IndexComponent } from './index/index.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";
import { TestItemComponent } from './test-item/test-item.component';
import {DialogEntryModule} from "../../common/dialog-entry/dialog-entry.module";
import {UserModule} from "../user/user.module";

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
    ReactiveFormsModule,
    DialogEntryModule,
    UserModule
  ]
})
export class TestModule { }
