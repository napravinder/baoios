import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LessonPlanPage } from './lesson-plan.page';

const routes: Routes = [
  {
    path: '',
    component: LessonPlanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LessonPlanPageRoutingModule {}
