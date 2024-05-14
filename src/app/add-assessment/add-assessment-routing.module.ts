import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAssessmentPage } from './add-assessment.page';

const routes: Routes = [
  {
    path: '',
    component: AddAssessmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAssessmentPageRoutingModule {}
