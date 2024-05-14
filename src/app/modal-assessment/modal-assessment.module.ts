import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalAssessmentPageRoutingModule } from './modal-assessment-routing.module';

import { ModalAssessmentPage } from './modal-assessment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalAssessmentPageRoutingModule
  ],
  declarations: [ModalAssessmentPage]
})
export class ModalAssessmentPageModule {}
