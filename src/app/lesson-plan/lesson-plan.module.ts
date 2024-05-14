import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LessonPlanPageRoutingModule } from './lesson-plan-routing.module';

import { LessonPlanPage } from './lesson-plan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LessonPlanPageRoutingModule
  ],
  declarations: [LessonPlanPage]
})
export class LessonPlanPageModule {}
