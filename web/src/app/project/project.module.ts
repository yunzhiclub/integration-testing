import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProjectRoutingModule} from "./project-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";
import {YzPageModule, YzSizeModule} from "@yunzhi/ng-common";
import { IndexComponent } from './index/index.component';
import {DialogEntryModule} from "../../common/dialog-entry/dialog-entry.module";
import {AddComponent} from "./add/add.component";
import {EditComponent} from "./edit/edit.component";
import {TestComponent} from "./test/test.component";
import { TestAddComponent } from './test/test-add/test-add.component';
import { TestEditComponent } from './test/test-edit/test-edit.component';
import { ProjectSelectComponent } from './project-select/project-select.component';
import {NzSelectModule} from "ng-zorro-antd/select";

/**
 * 项目模块
 */
@NgModule({
  declarations: [
    TestComponent,
    AddComponent,
    EditComponent,
    IndexComponent,
    TestAddComponent,
    TestEditComponent,
    ProjectSelectComponent
  ],
  exports: [
    ProjectSelectComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    FormsModule,
    MatTooltipModule,
    ReactiveFormsModule,
    YzPageModule,
    YzSizeModule,
    DialogEntryModule,
    NzSelectModule
  ]
})
export class ProjectModule { }
