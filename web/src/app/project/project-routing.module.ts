import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LargeItemComponent} from "./large-item/large-item.component";
import {SmallItemComponent} from "./small-item/small-item.component";
import {TestComponent} from "./test/test.component";
import {IndexComponent} from "./index/index.component";
import {AddComponent} from "./add/add.component";
import {EditComponent} from "./edit/edit.component";
import {DialogEntryComponent} from "../../common/dialog-entry/dialog-entry-component";


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
    path: 'testPlan',
    component: TestComponent
  },
  {
    path: 'largeItem',
    component: LargeItemComponent
  },
  {
    path: 'smallItem',
    component: SmallItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
