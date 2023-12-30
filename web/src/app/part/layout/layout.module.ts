import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import {HeaderModule} from "../header/header.module";
import {MenuModule} from "../menu/menu.module";
import {RouterOutlet} from "@angular/router";



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
    RouterOutlet
  ]
})
export class LayoutModule { }
