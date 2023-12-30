import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import {HeaderModule} from "../header/header.module";
import {MenuModule} from "../menu/menu.module";
import {RouterModule, RouterOutlet} from "@angular/router";
import {DashboardModule} from "../../dashboard/dashboard.module";



/**
 * 布局模块
 */
@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    MenuModule,
    RouterModule
  ]
})
export class LayoutModule { }
