import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodandnutritionPage } from './foodandnutrition.page';

const routes: Routes = [
  {
    path: '',
    component: FoodandnutritionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodandnutritionPageRoutingModule {}
