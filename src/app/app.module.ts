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
import {PopoverContentPage} from "../pages/popover/popover";
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';
import { ImageIconComponent } from '../components/image-icon/image-icon';
import { TodosProvider } from '../providers/todos/todos';
import { LoginServiceProvider } from '../providers/login-service/login-service';
import {Http, HttpModule} from '@angular/http';
import { KidsListServiceProvider } from '../providers/kids-list-service/kids-list-service';
import { FilterPipe } from '../pipes/filter/filter';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {IonicStorageModule} from "@ionic/storage";
import {LocationServiceProvider} from "../providers/location-service/location-service";


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    KidslistPage,
    ProfilePage,
    DetailsviewPage,
    PopoverContentPage,
    ProgressBarComponent,
    ImageIconComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    Ng2FilterPipeModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    KidslistPage,
    ProfilePage,
    DetailsviewPage,
    PopoverContentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TodosProvider,
    LoginServiceProvider,
    LocationServiceProvider,
    KidsListServiceProvider
  ]
})
export class AppModule {}

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
