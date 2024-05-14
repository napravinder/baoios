import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrinerTimertablePage } from './triner-timertable.page';

const routes: Routes = [
  {
    path: '',
    component: TrinerTimertablePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrinerTimertablePageRoutingModule {}
