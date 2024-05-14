import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddGalleryPageRoutingModule } from './add-gallery-routing.module';

import { AddGalleryPage } from './add-gallery.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddGalleryPageRoutingModule
  ],
  declarations: [AddGalleryPage]
})
export class AddGalleryPageModule {}
