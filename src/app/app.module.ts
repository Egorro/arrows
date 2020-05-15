import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

import {ButtonModule} from 'primeng/button';
import {AccordionModule} from 'primeng/accordion';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CardModule} from 'primeng/card';

import { AppComponent } from './app.component';
import { LibListComponent } from './lib-list/lib-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LibListComponent
  ],
  imports: [
    BrowserModule,
    DragDropModule,
    ButtonModule,
    AccordionModule,
    BrowserAnimationsModule,
    CardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
