import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { KidslistPage } from '../pages/kidslist/kidslist';
import {ProfilePage} from "../pages/profile/profile";
import {DetailsviewPage} from "../pages/detailsview/detailsview";
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    KidslistPage,
    ProfilePage,
    DetailsviewPage,
    ProgressBarComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    KidslistPage,
    ProfilePage,
    DetailsviewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
