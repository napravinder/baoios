import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrainingRequestPageRoutingModule } from './training-request-routing.module';

import { TrainingRequestPage } from './training-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrainingRequestPageRoutingModule
  ],
  declarations: [TrainingRequestPage]
})
export class TrainingRequestPageModule {}
