import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrinerTimertablePageRoutingModule } from './triner-timertable-routing.module';

import { TrinerTimertablePage } from './triner-timertable.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrinerTimertablePageRoutingModule
  ],
  declarations: [TrinerTimertablePage]
})
export class TrinerTimertablePageModule {}
