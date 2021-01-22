import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { ListboxModule } from 'primeng/listbox';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng';

@NgModule({
  exports: [CardModule, ButtonModule, AccordionModule, ListboxModule, ToastModule],
  providers: [MessageService]
})
export class PrimeNgModulesModule {}

