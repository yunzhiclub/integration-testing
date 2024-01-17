import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from "./index/index.component";
import {TestCaseItemComponent} from "./test-case-item/test-case-item.component";
import {DialogEntryComponent} from "../../common/dialog-entry/dialog-entry-component";
import {CloneComponent} from "./clone/clone.component";

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'clone',
        component: DialogEntryComponent,
        data: {
          component: CloneComponent
        }
      }
    ]
  },
  {
    path: 'testCaseItem',
    component: TestCaseItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestCaseRoutingModule { }
