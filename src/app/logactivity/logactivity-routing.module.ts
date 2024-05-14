import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogactivityPage } from './logactivity.page';

const routes: Routes = [
  {
    path: '',
    component: LogactivityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogactivityPageRoutingModule {}
