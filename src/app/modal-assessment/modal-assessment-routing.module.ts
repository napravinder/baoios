import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalAssessmentPage } from './modal-assessment.page';

const routes: Routes = [
  {
    path: '',
    component: ModalAssessmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalAssessmentPageRoutingModule {}
