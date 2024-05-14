import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainingRequestPage } from './training-request.page';

const routes: Routes = [
  {
    path: '',
    component: TrainingRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingRequestPageRoutingModule {}
