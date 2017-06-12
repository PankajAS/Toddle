import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { KidslistPage } from '../kidslist/kidslist';
import {LoginServiceProvider} from "../../providers/login-service/login-service";
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
KidslistPage1 = KidslistPage;
username:any;
password:any;


  constructor(public navCtrl: NavController, public loginReq: LoginServiceProvider, public loading: LoadingController) {
    this.username='';
    this.password='';
  }


  login(){
    if(this.username!='' && this.password!='') {
      let loader = this.loading.create({
        content: "Login..."
      });
      loader.present();
      this.loginReq.login(this.username, this.password).then((data) => {
        console.log("kids", data);
        this.navCtrl.setRoot(KidslistPage);
        loader.dismissAll();
      }, function (error) {
        console.log(error);
        loader.dismissAll();
      });
    }else{
      this.navCtrl.setRoot(KidslistPage);
    }
  }

}
