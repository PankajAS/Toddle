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
import { LoginServiceProvider } from '../providers/login-service/login-service';
import {Http, HttpModule} from '@angular/http';
import { KidsListServiceProvider } from '../providers/kids-list-service/kids-list-service';
import { FilterPipe } from '../pipes/filter/filter';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {IonicStorageModule} from "@ionic/storage";
import {LocationServiceProvider} from "../providers/location-service/location-service";
import { FiltersServiceProvider } from '../providers/filters-service/filters-service';
import {PopupModelPage} from "../pages/popup-model/popup-model";
import { KeyValuePipe } from '../pipes/key-value/key-value';
import {SQLite} from "@ionic-native/sqlite";
import { KidsDatabaseProvider } from '../providers/kids-database/kids-database';
import { Sqlite } from '../providers/kids-database/sqlite';
import { Network } from '@ionic-native/network';

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
    FilterPipe,
    PopupModelPage,
    KeyValuePipe
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
    PopoverContentPage,
    PopupModelPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginServiceProvider,
    LocationServiceProvider,
    KidsListServiceProvider,
    FiltersServiceProvider,
    SQLite,
    KidsDatabaseProvider,
    Sqlite,
    Network
    
  ]
})
export class AppModule {}

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
