import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProjectRoutingModule} from "./project-routing.module";
import { LargeItemComponent } from './large-item/large-item.component';
import { SmallItemComponent } from './small-item/small-item.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";
import {YzPageModule, YzSizeModule} from "@yunzhi/ng-common";
import { IndexComponent } from './index/index.component';
import {DialogEntryModule} from "../../common/dialog-entry/dialog-entry.module";
import {AddComponent} from "./add/add.component";
import {EditComponent} from "./edit/edit.component";
import {TestComponent} from "./test/test.component";
import { TestAddComponent } from './test/test-add/test-add.component';
import { TestEditComponent } from './test/test-edit/test-edit.component';


@NgModule({
  declarations: [
    TestComponent,
    LargeItemComponent,
    SmallItemComponent,
    AddComponent,
    EditComponent,
    IndexComponent,
    TestAddComponent,
    TestEditComponent
  ],
    imports: [
      CommonModule,
      ProjectRoutingModule,
      FormsModule,
      MatTooltipModule,
      ReactiveFormsModule,
      YzPageModule,
      YzSizeModule,
      DialogEntryModule
    ]
})
export class ProjectModule { }
