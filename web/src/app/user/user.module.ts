import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { IndexComponent } from './index/index.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {YzPageModule, YzSizeModule} from "@yunzhi/ng-common";
import {MatTooltipModule} from "@angular/material/tooltip";
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import {DialogEntryModule} from "../../common/dialog-entry/dialog-entry.module";


@NgModule({
  declarations: [
    IndexComponent,
    AddComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    YzSizeModule,
    YzPageModule,
    ReactiveFormsModule,
    MatTooltipModule,
    DialogEntryModule
  ]
})
export class UserModule { }
