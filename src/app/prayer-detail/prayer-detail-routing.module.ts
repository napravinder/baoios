import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrayerDetailPage } from './prayer-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PrayerDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrayerDetailPageRoutingModule {}
