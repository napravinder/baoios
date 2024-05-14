import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPrayerActivityPageRoutingModule } from './add-prayer-activity-routing.module';

import { AddPrayerActivityPage } from './add-prayer-activity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPrayerActivityPageRoutingModule
  ],
  declarations: [AddPrayerActivityPage]
})
export class AddPrayerActivityPageModule {}
