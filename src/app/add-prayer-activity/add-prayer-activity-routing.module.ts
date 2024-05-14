import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPrayerActivityPage } from './add-prayer-activity.page';

const routes: Routes = [
  {
    path: '',
    component: AddPrayerActivityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPrayerActivityPageRoutingModule {}
