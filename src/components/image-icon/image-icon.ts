import {Component, Input} from '@angular/core';

/**
 * Generated class for the ImageIconComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'image-icon',
  templateUrl: 'image-icon.html'
})
export class ImageIconComponent {
  @Input('imgUrl') imgUrl;
  @Input('height') height;
  @Input('width') width;
  @Input('color') color;


  constructor() {

  }
}
