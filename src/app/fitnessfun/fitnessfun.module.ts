import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FitnessfunPageRoutingModule } from './fitnessfun-routing.module';

import { FitnessfunPage } from './fitnessfun.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FitnessfunPageRoutingModule
  ],
  declarations: [FitnessfunPage]
})
export class FitnessfunPageModule {}
