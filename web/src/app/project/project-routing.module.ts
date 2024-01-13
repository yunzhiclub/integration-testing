import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProjectComponent} from "./project/project.component";
import {LargeItemComponent} from "./large-item/large-item.component";
import {SmallItemComponent} from "./small-item/small-item.component";
import {TestComponent} from "./test/test.component";
import {AddComponent} from "./project/add/add.component";
import {EditComponent} from "./project/edit/edit.component";

const routes: Routes = [
  {
    path: '',
    component: ProjectComponent
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
