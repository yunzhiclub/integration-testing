import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TestComponent} from "./test/test.component";
import {IndexComponent} from "./index/index.component";
import {AddComponent} from "./add/add.component";
import {EditComponent} from "./edit/edit.component";
import {DialogEntryComponent} from "../../common/dialog-entry/dialog-entry-component";
import {TestAddComponent} from "./test/test-add/test-add.component";
import {TestEditComponent} from "./test/test-edit/test-edit.component";


const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
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
      }
    ]
  },
  {
    path: 'testPlan/:id',
    component: TestComponent,
    children: [
      {
        path: 'add',
        component: DialogEntryComponent,
        data: {
          component: TestAddComponent
        }
      },
      {
        path: 'edit/:id',
        component: DialogEntryComponent,
        data: {
          component: TestEditComponent
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
