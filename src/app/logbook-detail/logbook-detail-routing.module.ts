import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogbookDetailPage } from './logbook-detail.page';

const routes: Routes = [
  {
    path: '',
    component: LogbookDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogbookDetailPageRoutingModule {}
