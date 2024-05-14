import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessHomePageRoutingModule } from './business-home-routing.module';

import { BusinessHomePage } from './business-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusinessHomePageRoutingModule
  ],
  declarations: [BusinessHomePage]
})
export class BusinessHomePageModule {}
