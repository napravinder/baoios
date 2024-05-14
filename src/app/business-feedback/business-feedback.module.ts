import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessFeedbackPageRoutingModule } from './business-feedback-routing.module';

import { BusinessFeedbackPage } from './business-feedback.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusinessFeedbackPageRoutingModule
  ],
  declarations: [BusinessFeedbackPage]
})
export class BusinessFeedbackPageModule {}
