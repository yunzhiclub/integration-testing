import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TestCaseRoutingModule} from './test-case-routing.module';
import {IndexComponent} from './index/index.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";
import {CloneComponent} from './clone/clone.component';
import {DialogEntryModule} from "../../common/dialog-entry/dialog-entry.module";
import {ProjectModule} from "../project/project.module";
import {NzTableModule} from "ng-zorro-antd/table";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {AddComponent} from './add/add.component';
import {EditComponent} from './edit/edit.component';
import {NzSelectModule} from "ng-zorro-antd/select";
import {TestCaseSelectMultipleComponent} from "./test-case-select-multiple/test-case-select-multiple.component";
import {AddTestItemComponent} from "./add-test-item/add-test-item.component";
import {EditTestItemComponent} from "./edit-test-item/edit-test-item.component";
import {YzPageModule, YzSizeModule} from "@yunzhi/ng-common";
import {UserModule} from "../user/user.module";
import {EditorModule} from "../editor/editor.module";

/**
 * 测试用例模块
 */
@NgModule({
  declarations: [
    IndexComponent,
    CloneComponent,
    AddComponent,
    EditComponent,
    TestCaseSelectMultipleComponent,
    AddTestItemComponent,
    EditTestItemComponent
  ],
  exports: [
    TestCaseSelectMultipleComponent
  ],
  imports: [
    CommonModule,
    TestCaseRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    DialogEntryModule,
    ProjectModule,
    NzTableModule,
    DragDropModule,
    NzSelectModule,
    YzSizeModule,
    YzPageModule,
    UserModule,
    EditorModule
  ]
})
export class TestCaseModule {
}
