import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GalleryModalPage } from './gallery-modal.page';

const routes: Routes = [
  {
    path: '',
    component: GalleryModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GalleryModalPageRoutingModule {}
