import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from "./index/index.component";
import {DialogEntryComponent} from "../../common/dialog-entry/dialog-entry-component";
import {CloneComponent} from "./clone/clone.component";
import {AddComponent} from "./add/add.component";
import {EditComponent} from "./edit/edit.component";
import {AddTestItemComponent} from "./add-test-item/add-test-item.component";
import {EditTestItemComponent} from "./edit-test-item/edit-test-item.component";

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
      },
      {
        path: 'add',
        component: DialogEntryComponent,
        data: {
          component: AddComponent
        }
      },
      {
        path: 'edit/:id',
        component: DialogEntryComponent,
        data: {
          component: EditComponent
        }
      },
      {
        path: 'addTestItem/:id',
        component: DialogEntryComponent,
        data: {
          component: AddTestItemComponent
        }
      },
      {
        path: 'editTestItem/:id',
        component: DialogEntryComponent,
        data: {
          component: EditTestItemComponent
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestCaseRoutingModule { }
