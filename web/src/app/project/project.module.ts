import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project/project.component';
import {ProjectRoutingModule} from "./project-routing.module";
import { TestComponent } from './test/test.component';
import { LargeItemComponent } from './large-item/large-item.component';
import { SmallItemComponent } from './small-item/small-item.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";
import {YzPageModule, YzSizeModule} from "@yunzhi/ng-common";
import { AddComponent } from './project/add/add.component';
import { EditComponent } from './project/edit/edit.component';


@NgModule({
  declarations: [
    ProjectComponent,
    TestComponent,
    LargeItemComponent,
    SmallItemComponent,
    AddComponent,
    EditComponent
  ],
    imports: [
        CommonModule,
        ProjectRoutingModule,
        FormsModule,
        MatTooltipModule,
        ReactiveFormsModule,
        YzPageModule,
        YzSizeModule,
    ]
})
export class ProjectModule { }
