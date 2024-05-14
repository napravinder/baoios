import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAssessmentPageRoutingModule } from './add-assessment-routing.module';

import { AddAssessmentPage } from './add-assessment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAssessmentPageRoutingModule
  ],
  declarations: [AddAssessmentPage]
})
export class AddAssessmentPageModule {}
