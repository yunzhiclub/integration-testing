import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestCaseRoutingModule } from './test-case-routing.module';
import { IndexComponent } from './index/index.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";
import { TestCaseItemComponent } from './test-case-item/test-case-item.component';
import { CloneComponent } from './clone/clone.component';
import {DialogEntryModule} from "../../common/dialog-entry/dialog-entry.module";
import {ProjectModule} from "../project/project.module";

/**
 * 测试用例模块
 */
@NgModule({
  declarations: [
    IndexComponent,
    TestCaseItemComponent,
    CloneComponent
  ],
  imports: [
    CommonModule,
    TestCaseRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    DialogEntryModule,
    ProjectModule
  ]
})
export class TestCaseModule { }
