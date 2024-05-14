import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FitnessDetailPage } from './fitness-detail.page';

const routes: Routes = [
  {
    path: '',
    component: FitnessDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FitnessDetailPageRoutingModule {}
