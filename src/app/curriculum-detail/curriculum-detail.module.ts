import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CurriculumDetailPageRoutingModule } from './curriculum-detail-routing.module';

import { CurriculumDetailPage } from './curriculum-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CurriculumDetailPageRoutingModule
  ],
  declarations: [CurriculumDetailPage]
})
export class CurriculumDetailPageModule {}
