import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImageIconComponent } from './image-icon';

@NgModule({
  declarations: [
    ImageIconComponent,
  ],
  imports: [
    IonicPageModule.forChild(ImageIconComponent),
  ],
  exports: [
    ImageIconComponent
  ]
})
export class ImageIconComponentModule {}
