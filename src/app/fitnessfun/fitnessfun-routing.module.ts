import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FitnessfunPage } from './fitnessfun.page';

const routes: Routes = [
  {
    path: '',
    component: FitnessfunPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FitnessfunPageRoutingModule {}
