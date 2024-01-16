import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalRoutingModule } from './personal-routing.module';
import { IndexComponent } from './index/index.component';
import {UserModule} from "../user/user.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    PersonalRoutingModule,
    UserModule,
    ReactiveFormsModule
  ]
})
export class PersonalModule { }
