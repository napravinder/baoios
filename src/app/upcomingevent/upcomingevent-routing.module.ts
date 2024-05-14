import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpcomingeventPage } from './upcomingevent.page';

const routes: Routes = [
  {
    path: '',
    component: UpcomingeventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpcomingeventPageRoutingModule {}
