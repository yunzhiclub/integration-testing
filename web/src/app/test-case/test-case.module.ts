import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestCaseRoutingModule } from './test-case-routing.module';
import { IndexComponent } from './index/index.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";
import { CloneComponent } from './clone/clone.component';
import {DialogEntryModule} from "../../common/dialog-entry/dialog-entry.module";
import {ProjectModule} from "../project/project.module";
import {NzTableModule} from "ng-zorro-antd/table";
import {DragDropModule} from "@angular/cdk/drag-drop";

/**
 * 测试用例模块
 */
@NgModule({
  declarations: [
    IndexComponent,
    CloneComponent
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
        DragDropModule
    ]
})
export class TestCaseModule { }
