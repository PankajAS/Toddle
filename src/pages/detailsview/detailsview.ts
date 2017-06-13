import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-detailsview',
  templateUrl: 'detailsview.html',
})
export class DetailsviewPage {
  name:any;
  loadProgress = 50;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.name = this.navParams.data;
  }

  ionViewDidLoad() {

  }

}
