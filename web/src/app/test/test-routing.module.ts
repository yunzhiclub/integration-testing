import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from "./index/index.component";
import {TestItemComponent} from "./test-item/test-item.component";

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'testItem',
    component: TestItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
