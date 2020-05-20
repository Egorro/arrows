import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { LibListComponent } from './components/lib-list/lib-list.component';
import { PrimeNgModulesModule } from './modules/prime-ng-modules/prime-ng-modules.module';
import { BlockParametersComponent } from './components/block-parameters/block-parameters.component';
import { FormsModule } from '@angular/forms';
import { BoxComponent } from './components/box/box.component';

@NgModule({
  declarations: [AppComponent, LibListComponent, BlockParametersComponent, BoxComponent],
  imports: [
    BrowserModule,
    FormsModule,
    DragDropModule,
    BrowserAnimationsModule,
    PrimeNgModulesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
