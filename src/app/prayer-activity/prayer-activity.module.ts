import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrayerActivityPageRoutingModule } from './prayer-activity-routing.module';

import { PrayerActivityPage } from './prayer-activity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrayerActivityPageRoutingModule
  ],
  declarations: [PrayerActivityPage]
})
export class PrayerActivityPageModule {}
