import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FitnessDetailPageRoutingModule } from './fitness-detail-routing.module';

import { FitnessDetailPage } from './fitness-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FitnessDetailPageRoutingModule
  ],
  declarations: [FitnessDetailPage]
})
export class FitnessDetailPageModule {}
