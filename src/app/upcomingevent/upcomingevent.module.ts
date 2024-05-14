import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpcomingeventPageRoutingModule } from './upcomingevent-routing.module';

import { UpcomingeventPage } from './upcomingevent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpcomingeventPageRoutingModule
  ],
  declarations: [UpcomingeventPage]
})
export class UpcomingeventPageModule {}
