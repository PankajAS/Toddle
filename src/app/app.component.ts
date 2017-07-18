import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from "../pages/login/login";
import { KidslistPage } from "../pages/kidslist/kidslist";
import { TranslateService } from '@ngx-translate/core';
import { Sqlite } from "../providers/kids-database/sqlite";

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild('nav') nav;
  rootPage: any;
  userdata
  userDetails: { [k: string]: any } = {};

  constructor(platform: Platform, public kidsDb: Sqlite, statusBar: StatusBar, splashScreen: SplashScreen, translate: TranslateService) {

    translate.setDefaultLang('en');//here setting default language as english
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.initializeApp();
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  initializeApp() {
    this.kidsDb.openDb();
    this.kidsDb.getUserInfo().then((data) => {
      this.userdata = data[0];
      if (this.userdata) {
        this.userDetails.data = { 'user_id': this.userdata.user_id, 'token': this.userdata.token }
        this.userDetails.installation_key = this.userdata.city_key;
        this.userDetails.password = this.userdata.password;
        this.nav.setRoot(KidslistPage, this.userDetails)
        //  this.rootPage = KidslistPage;
      } else {
        this.rootPage = LoginPage;
      }
    }, (e) => {
      this.rootPage = LoginPage;
    })
  }
}
