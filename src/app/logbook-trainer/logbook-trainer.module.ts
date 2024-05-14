import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogbookTrainerPageRoutingModule } from './logbook-trainer-routing.module';

import { LogbookTrainerPage } from './logbook-trainer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogbookTrainerPageRoutingModule
  ],
  declarations: [LogbookTrainerPage]
})
export class LogbookTrainerPageModule {}
