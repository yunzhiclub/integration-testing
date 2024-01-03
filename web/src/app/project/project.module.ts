import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project/project.component';
import {ProjectRoutingModule} from "./project-routing.module";
import { TestComponent } from './test/test.component';
import { LargeItemComponent } from './large-item/large-item.component';
import { SmallItemComponent } from './small-item/small-item.component';



@NgModule({
  declarations: [
    ProjectComponent,
    TestComponent,
    LargeItemComponent,
    SmallItemComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule
  ]
})
export class ProjectModule { }
