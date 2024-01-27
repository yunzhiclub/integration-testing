import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TestItemComponent} from "./test-item/test-item.component";
import {EditTestItemComponent} from "./edit-test-item/edit-test-item.component";
import {DialogEntryComponent} from "../../common/dialog-entry/dialog-entry-component";
import {IndexComponent} from "./index/index.component";

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
    ]
  },
  {
    path: 'testItem',
    component: TestItemComponent,
    children: [
      {
        path: 'edit',
        component: DialogEntryComponent,
        data: {
          component: EditTestItemComponent
        }
      }
    ]
  },

  // {
  //   path: 'testItem/edit',
  //   component: DialogEntryComponent,
  //   data: {
  //     component: EditTestItemComponent
  //   }
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
