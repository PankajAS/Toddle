import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopupModelPage } from './popup-model';

@NgModule({
  declarations: [
    PopupModelPage,
  ],
  imports: [
    IonicPageModule.forChild(PopupModelPage),
  ],
  exports: [
    PopupModelPage
  ]
})
export class PopupModelPageModule {}
