import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FooddetailPageRoutingModule } from './fooddetail-routing.module';

import { FooddetailPage } from './fooddetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FooddetailPageRoutingModule
  ],
  declarations: [FooddetailPage]
})
export class FooddetailPageModule {}
