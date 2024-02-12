import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from "./index/index.component";
import {DialogEntryComponent} from "../../common/dialog-entry/dialog-entry-component";
import {AddComponent} from "./add/add.component";
import {EditComponent} from "./edit/edit.component";

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'add',
        component: DialogEntryComponent,
        data: {
          component: AddComponent,
        }
      },
      {
        path: 'edit/:id',
        component: DialogEntryComponent,
        data: {
          component: EditComponent
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestPlanRoutingModule { }
