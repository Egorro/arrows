import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { LibListComponent } from './lib-list/lib-list.component';
import { PrimeNgModulesModule } from './prime-ng-modules/prime-ng-modules.module';

@NgModule({
  declarations: [AppComponent, LibListComponent],
  imports: [
    BrowserModule,
    DragDropModule,
    BrowserAnimationsModule,
    PrimeNgModulesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
