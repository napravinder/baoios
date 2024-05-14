import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrayerActivityPage } from './prayer-activity.page';

const routes: Routes = [
  {
    path: '',
    component: PrayerActivityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrayerActivityPageRoutingModule {}
