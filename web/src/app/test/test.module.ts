import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TestRoutingModule} from './test-routing.module';
import {IndexComponent} from './index/index.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";
import {TestItemComponent} from './test-item/test-item.component';
import {DialogEntryModule} from "../../common/dialog-entry/dialog-entry.module";
import {UserModule} from "../user/user.module";
import {TestCaseModule} from "../test-case/test-case.module";
import {EditTestItemComponent} from './edit-test-item/edit-test-item.component';
import {EditorModule} from "../editor/editor.module";
import {NzSelectModule} from "ng-zorro-antd/select";
import {ProjectModule} from "../project/project.module";
import {TestPlanModule} from "../test-plan/test-plan.module";
import {YzPageModule, YzSizeModule} from "@yunzhi/ng-common";


/**
 * 测试管理模块
 */
@NgModule({
  declarations: [
    IndexComponent,
    TestItemComponent,
    EditTestItemComponent
  ],
  imports: [
    CommonModule,
    TestRoutingModule,
    FormsModule,
    MatTooltipModule,
    ReactiveFormsModule,
    DialogEntryModule,
    UserModule,
    TestCaseModule,
    EditorModule,
    NzSelectModule,
    ProjectModule,
    TestPlanModule,
    YzPageModule,
    YzSizeModule
  ]
})
export class TestModule {
}
