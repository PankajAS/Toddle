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
installation_key:any;
userDetails:{[k: string]: any}={};


  constructor(public navCtrl: NavController, public loginReq: LoginServiceProvider,
              public loading: LoadingController, public storage:Storage) {
    this.username='api.test@tactics.be';
    this.password='passw';
    this.installation_key ='leuven_acc';

  }

  login(){

    if(this.username!='' && this.password!='') {
      let loader = this.loading.create({
        content: "Login..."
      });
      loader.present();
      this.loginReq.login(this.username, this.password, this.installation_key).then((data) => {
        this.userDetails.data = data;
        this.userDetails.installation_key = this.installation_key;
        this.storage.set("userId",this.userDetails.data.user_id);
        this.storage.set("token",this.userDetails.data.token);
        this.storage.set("installation_key",this.userDetails.installation_key);
        console.log(this.userDetails.data.user_id)
        console.log(this.userDetails)
        this.navCtrl.setRoot(KidslistPage,this.userDetails);
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
