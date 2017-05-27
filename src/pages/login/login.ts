import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { KidslistPage } from '../kidslist/kidslist';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
KidslistPage1 = KidslistPage;

  constructor(public navCtrl: NavController) {

  }

}
