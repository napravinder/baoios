import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessTimeTablePageRoutingModule } from './business-time-table-routing.module';

import { BusinessTimeTablePage } from './business-time-table.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusinessTimeTablePageRoutingModule
  ],
  declarations: [BusinessTimeTablePage]
})
export class BusinessTimeTablePageModule {}
