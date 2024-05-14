import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogbookPageRoutingModule } from './logbook-routing.module';

import { LogbookPage } from './logbook.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogbookPageRoutingModule
  ],
  declarations: [LogbookPage]
})
export class LogbookPageModule {}
