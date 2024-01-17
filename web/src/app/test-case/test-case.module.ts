import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestCaseRoutingModule } from './test-case-routing.module';
import { IndexComponent } from './index/index.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";
import { TestCaseItemComponent } from './test-case-item/test-case-item.component';


@NgModule({
  declarations: [
    IndexComponent,
    TestCaseItemComponent
  ],
  imports: [
    CommonModule,
    TestCaseRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule
  ]
})
export class TestCaseModule { }
