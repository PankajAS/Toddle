import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-detailsview',
  templateUrl: 'detailsview.html',
})
export class DetailsviewPage {
  name:string;
  loadProgress = 50;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.name = this.navParams.data;
    console.log('ionViewDidLoad ProfilePage');
  }

}
