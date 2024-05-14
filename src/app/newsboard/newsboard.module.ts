import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsboardPageRoutingModule } from './newsboard-routing.module';

import { NewsboardPage } from './newsboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsboardPageRoutingModule
  ],
  declarations: [NewsboardPage]
})
export class NewsboardPageModule {}
