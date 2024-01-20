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
import { ProjectSelectComponent } from './project-select/project-select.component';
import {NzSelectModule} from "ng-zorro-antd/select";
import {CdkDrag, CdkDropList} from "@angular/cdk/drag-drop";
import {NzTableModule} from "ng-zorro-antd/table";

/**
 * 项目模块
 */
@NgModule({
  declarations: [
    AddComponent,
    EditComponent,
    IndexComponent,
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
    NzSelectModule,
    CdkDrag,
    NzTableModule,
    CdkDropList
  ]
})
export class ProjectModule { }
