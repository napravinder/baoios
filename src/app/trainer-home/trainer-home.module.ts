import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrainerHomePageRoutingModule } from './trainer-home-routing.module';

import { TrainerHomePage } from './trainer-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrainerHomePageRoutingModule
  ],
  declarations: [TrainerHomePage]
})
export class TrainerHomePageModule {}
