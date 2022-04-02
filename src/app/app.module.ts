import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ImageManagerComponent} from "./image-manager/image-manager.component";
import {MatDialogModule} from "@angular/material/dialog";
import {DialogComponent} from "./dialog/dialog.component";
import {ImageUploaderComponent} from "./image-manager/image-uploader/image-uploader.component";
import {MiniStepperComponent} from "./image-manager/mini-stepper/mini-stepper.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatIconModule} from "@angular/material/icon";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    ImageManagerComponent,
    DialogComponent,
    ImageUploaderComponent,
    MiniStepperComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    DragDropModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
