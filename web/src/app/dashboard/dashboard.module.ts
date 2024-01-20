import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {UserModule} from "../user/user.module";
import {NzTableModule} from "ng-zorro-antd/table";
import {CdkDrag} from "@angular/cdk/drag-drop";
import {MatTooltipModule} from "@angular/material/tooltip";



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    UserModule,
    NzTableModule,
    CdkDrag,
    MatTooltipModule
  ]
})
export class DashboardModule { }
