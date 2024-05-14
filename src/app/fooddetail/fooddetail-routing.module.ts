import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FooddetailPage } from './fooddetail.page';

const routes: Routes = [
  {
    path: '',
    component: FooddetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FooddetailPageRoutingModule {}
