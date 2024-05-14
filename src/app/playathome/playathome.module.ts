import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayathomePageRoutingModule } from './playathome-routing.module';

import { PlayathomePage } from './playathome.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayathomePageRoutingModule
  ],
  declarations: [PlayathomePage]
})
export class PlayathomePageModule {}
