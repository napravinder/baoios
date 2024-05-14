import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogactivityPageRoutingModule } from './logactivity-routing.module';

import { LogactivityPage } from './logactivity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogactivityPageRoutingModule
  ],
  declarations: [LogactivityPage]
})
export class LogactivityPageModule {}
