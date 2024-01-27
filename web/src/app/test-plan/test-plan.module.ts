import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TestPlanRoutingModule} from './test-plan-routing.module';
import {IndexComponent} from './index/index.component';
import {AddComponent} from './add/add.component';
import {EditComponent} from './edit/edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";
import {YzPageModule, YzSizeModule} from "@yunzhi/ng-common";
import {DialogEntryModule} from "../../common/dialog-entry/dialog-entry.module";
import {ProjectModule} from "../project/project.module";
import {UserModule} from "../user/user.module";
import {TestCaseModule} from "../test-case/test-case.module";
import {StatusPipe} from "../../pipe/status.pipe";
import {TestCaseSelectComponent} from "../test-case/test-case-select/test-case-select.component";

/**
 * 测试计划模块
 */
@NgModule({
    declarations: [
        IndexComponent,
        AddComponent,
        EditComponent,
        StatusPipe
    ],
  imports: [
    CommonModule,
    TestPlanRoutingModule,
    FormsModule,
    MatTooltipModule,
    ReactiveFormsModule,
    YzPageModule,
    YzSizeModule,
    DialogEntryModule,
    ProjectModule,
    UserModule,
    TestCaseModule
  ]
})
export class TestPlanModule {
}
