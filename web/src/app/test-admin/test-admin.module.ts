import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestAdminRoutingModule } from './test-admin-routing.module';
import { IndexComponent } from './index/index.component';
import {FormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";
import { TestItemComponent } from './test-item/test-item.component';
import {ProjectModule} from "../project/project.module";


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
        ProjectModule
    ]
})
export class TestAdminModule { }
