import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainerHomePage } from './trainer-home.page';

const routes: Routes = [
  {
    path: '',
    component: TrainerHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainerHomePageRoutingModule {}
