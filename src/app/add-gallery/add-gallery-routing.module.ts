import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddGalleryPage } from './add-gallery.page';

const routes: Routes = [
  {
    path: '',
    component: AddGalleryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddGalleryPageRoutingModule {}
