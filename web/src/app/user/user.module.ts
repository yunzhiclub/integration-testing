import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { IndexComponent } from './index/index.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {YzPageModule, YzSizeModule} from "@yunzhi/ng-common";
import {MatTooltipModule} from "@angular/material/tooltip";
import {ApiDemoModule} from "../../api/api.demo.module";


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    YzSizeModule,
    YzPageModule,
    ReactiveFormsModule,
    MatTooltipModule
  ]
})
export class UserModule { }
