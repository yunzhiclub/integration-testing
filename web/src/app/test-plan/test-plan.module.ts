import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestPlanRoutingModule } from './test-plan-routing.module';
import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";
import {YzPageModule, YzSizeModule} from "@yunzhi/ng-common";
import {DialogEntryModule} from "../../common/dialog-entry/dialog-entry.module";
import {ProjectModule} from "../project/project.module";


@NgModule({
  declarations: [
    IndexComponent,
    AddComponent,
    EditComponent
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
    ProjectModule
  ]
})
export class TestPlanModule { }