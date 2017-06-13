import { Component } from '@angular/core';
import {ViewController} from 'ionic-angular';

/**
 * Generated class for the PopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverContentPage {

  constructor(public viewCtrl: ViewController) {}
  close() {
    this.viewCtrl.dismiss();
  }

}
