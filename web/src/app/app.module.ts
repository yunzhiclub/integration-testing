import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {RouterOutlet} from "@angular/router";
import {LayoutModule} from "./part/layout/layout.module";
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {ApiDemoModule} from "../api/api.demo.module";
import {ApiProModule} from "../api/api-pro-module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    LayoutModule,
    AppRoutingModule,
    HttpClientModule,
    // ApiDemoModule,
    ApiProModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
