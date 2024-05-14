import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessHomePage } from './business-home.page';

const routes: Routes = [
  {
    path: '',
    component: BusinessHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessHomePageRoutingModule {}
