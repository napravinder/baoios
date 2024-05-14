import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsboardPage } from './newsboard.page';

const routes: Routes = [
  {
    path: '',
    component: NewsboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsboardPageRoutingModule {}
