import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogEntryComponent} from "./dialog-entry-component";
import {MatDialogModule} from "@angular/material/dialog";



@NgModule({
  declarations: [DialogEntryComponent],
  imports: [
    MatDialogModule
  ],
  exports: [
    DialogEntryComponent
  ]
})
export class DialogEntryModule { }
