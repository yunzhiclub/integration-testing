import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from "./index/index.component";
import {TestItemComponent} from "./test-item/test-item.component";
import {DialogEntryComponent} from "../../common/dialog-entry/dialog-entry-component";
import {UserSelectComponent} from "../user/user-select/user-select.component";

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'testItem',
    component: TestItemComponent
  },
  {
    path: 'edit/testUser',
    component: DialogEntryComponent,
    data: {
      component: UserSelectComponent
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
