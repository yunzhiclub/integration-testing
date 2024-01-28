import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoComponent } from './demo/demo.component';
import {EditorModule} from "@tinymce/tinymce-angular";
import {DemoRoutingModule} from "./demo-routing.module";
import {DialogEntryModule} from "../../common/dialog-entry/dialog-entry.module";



@NgModule({
  declarations: [
    DemoComponent
  ],
  imports: [
    CommonModule,
    EditorModule,
    DemoRoutingModule,
    DialogEntryModule
  ]
})
export class DemoModule { }
