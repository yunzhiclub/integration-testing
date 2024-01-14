import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { IndexComponent } from './index/index.component';
import {YzPageModule, YzSizeModule} from "@yunzhi/ng-common";
import {MatTooltipModule} from "@angular/material/tooltip";
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import {DialogEntryModule} from "../../common/dialog-entry/dialog-entry.module";
import {RoleSelectComponent} from "./role-select/role-select.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzSelectModule} from "ng-zorro-antd/select";
import {RolePipe} from "../../pipe/role.pipe";



@NgModule({
    declarations: [
        IndexComponent,
        AddComponent,
        EditComponent,
        RoleSelectComponent,
        RolePipe
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        FormsModule,
        YzSizeModule,
        YzPageModule,
        ReactiveFormsModule,
        MatTooltipModule,
        DialogEntryModule,
        NzSelectModule
    ]
})
export class UserModule { }
