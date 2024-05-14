import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogbookDetailPageRoutingModule } from './logbook-detail-routing.module';

import { LogbookDetailPage } from './logbook-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogbookDetailPageRoutingModule
  ],
  declarations: [LogbookDetailPage]
})
export class LogbookDetailPageModule {}
