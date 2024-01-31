import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestAdminRoutingModule } from './test-admin-routing.module';
import { IndexComponent } from './index/index.component';
import {FormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    TestAdminRoutingModule,
    FormsModule,
    MatTooltipModule
  ]
})
export class TestAdminModule { }
