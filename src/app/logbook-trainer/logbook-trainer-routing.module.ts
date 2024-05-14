import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogbookTrainerPage } from './logbook-trainer.page';

const routes: Routes = [
  {
    path: '',
    component: LogbookTrainerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogbookTrainerPageRoutingModule {}
