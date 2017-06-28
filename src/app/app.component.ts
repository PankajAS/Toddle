import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import { TranslateService } from '@ngx-translate/core';
import {Sqlite} from "../providers/kids-database/sqlite";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, public kidsDb: Sqlite, statusBar: StatusBar, splashScreen: SplashScreen, translate: TranslateService) {
    translate.setDefaultLang('en');//here setting default language as english
    platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.initializeApp();

    });
  }
  
  initializeApp(){
    this.kidsDb.openDb();    
  }
}
