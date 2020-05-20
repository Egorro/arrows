import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { ListboxModule } from 'primeng/listbox';

@NgModule({
  exports: [CardModule, ButtonModule, AccordionModule, ListboxModule],
})
export class PrimeNgModulesModule {}
