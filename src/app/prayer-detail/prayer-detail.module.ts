import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrayerDetailPageRoutingModule } from './prayer-detail-routing.module';

import { PrayerDetailPage } from './prayer-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrayerDetailPageRoutingModule
  ],
  declarations: [PrayerDetailPage]
})
export class PrayerDetailPageModule {}
