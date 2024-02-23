import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestAdminRoutingModule } from './test-admin-routing.module';
import { IndexComponent } from './index/index.component';
import {FormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";
import { TestItemComponent } from './test-item/test-item.component';
import {ProjectModule} from "../project/project.module";
import {TestPlanModule} from "../test-plan/test-plan.module";
import {YzPageModule, YzSizeModule} from "@yunzhi/ng-common";
import {NzSelectModule} from "ng-zorro-antd/select";
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    IndexComponent,
    TestItemComponent
  ],
    imports: [
      CommonModule,
      TestAdminRoutingModule,
      FormsModule,
      MatTooltipModule,
      ProjectModule,
      TestPlanModule,
      YzSizeModule,
      YzPageModule,
      NzSelectModule
    ]
})
export class TestAdminModule { }
