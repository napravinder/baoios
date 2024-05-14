import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrayerModelPageRoutingModule } from './prayer-model-routing.module';

import { PrayerModelPage } from './prayer-model.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrayerModelPageRoutingModule
  ],
  declarations: [PrayerModelPage]
})
export class PrayerModelPageModule {}
