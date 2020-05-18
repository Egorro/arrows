import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';


@NgModule({
  exports: [
    CardModule,
    ButtonModule,
    AccordionModule,
  ]
})
export class PrimeNgModulesModule { }
