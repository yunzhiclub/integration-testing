import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestAdminRoutingModule } from './test-admin-routing.module';
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    TestAdminRoutingModule
  ]
})
export class TestAdminModule { }
