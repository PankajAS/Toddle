import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { KidslistPage } from '../kidslist/kidslist';
import {LoginServiceProvider} from "../../providers/login-service/login-service";
import { LoadingController } from 'ionic-angular';
import {Storage} from "@ionic/storage";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
KidslistPage1 = KidslistPage;
username:any;
password:any;
userDetails:any;

  constructor(public navCtrl: NavController, public loginReq: LoginServiceProvider,
              public loading: LoadingController, public storage:Storage) {
    this.username='api.test@tactics.be';
    this.password='passw';
  }


  login(){
    if(this.username!='' && this.password!='') {
      let loader = this.loading.create({
        content: "Login..."
      });
      loader.present();
      this.loginReq.login(this.username, this.password).then((data) => {
        this.userDetails = data;
        this.storage.set("userId",this.userDetails.user_id);
        this.storage.set("token",this.userDetails.token);
        console.log(data)
        this.navCtrl.setRoot(KidslistPage,data);
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
