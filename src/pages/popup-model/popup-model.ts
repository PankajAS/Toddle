import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the PopupModelPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-popup-model',
  templateUrl: 'popup-model.html'
})
export class PopupModelPage implements OnInit{

  child_groups =[{}];

  ngOnInit(): void {
    this.child_groups = this.navParams.data;
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {

  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }
}
