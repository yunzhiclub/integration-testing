import {RouterModule, Routes} from "@angular/router";
import {IndexComponent} from "../personal/index/index.component";
import {NgModule} from "@angular/core";
import {DemoComponent} from "./demo/demo.component";
import {DialogEntryComponent} from "../../common/dialog-entry/dialog-entry-component";

const routes: Routes = [
  {
    path: '',
    component: DialogEntryComponent,
    data: {
      path: 'demo',
      component: DemoComponent
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
