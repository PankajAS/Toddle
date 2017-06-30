import { Component, OnInit } from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import { KidslistPage } from '../kidslist/kidslist';
import {LoginServiceProvider} from "../../providers/login-service/login-service";
import { LoadingController } from 'ionic-angular';
import { Sqlite } from "../../providers/kids-database/sqlite";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit{

KidslistPage1 = KidslistPage;
username:any;
password:any;
installation_key:any;
userDetails:{[k: string]: any}={};


  constructor(public navCtrl: NavController,
              public loginReq: LoginServiceProvider,
              public loading: LoadingController,
              public platform: Platform, 
              public sqlite:Sqlite) {
               
    this.username='api.test@tactics.be';
    this.password='passw';
    this.installation_key ='leuven_acc';

  }

  ngOnInit(){    

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
        this.userDetails.password = this.password;       
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
