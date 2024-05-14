import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayathomePage } from './playathome.page';

const routes: Routes = [
  {
    path: '',
    component: PlayathomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayathomePageRoutingModule {}
