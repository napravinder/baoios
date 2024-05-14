import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessFeedbackPage } from './business-feedback.page';

const routes: Routes = [
  {
    path: '',
    component: BusinessFeedbackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessFeedbackPageRoutingModule {}
