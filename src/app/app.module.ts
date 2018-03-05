import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';
import { SessionsPage } from '../pages/sessions/sessions';
import { ModalIdentityPage } from '../pages/modal-identity/modal-identity';
import { ModalLanguagePage } from '../pages/modal-language/modal-language';
import { ModalEditPage } from '../pages/modal-edit/modal-edit';
import { TabsPage } from '../pages/tabs/tabs';
import { PopoverLanguagePage } from '../pages/popover-language/popover-language';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Media } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { Device } from '@ionic-native/device';

import { SpeechProvider } from '../providers/speech/speech';
import { LoadingProvider } from '../providers/loading/loading';

import { TranscriptionComponent } from '../components/transcription/transcription';

const firebaseConfig = {
  apiKey: 'AIzaSyA-Gic95TJv7vHPntFg9rQJuWkZ-BZaVIM',
  authDomain: 'trive-1470008045258.firebaseapp.com',
  databaseURL: 'https://trive-1470008045258.firebaseio.com',
  projectId: 'trive-1470008045258',
  storageBucket: 'trive-1470008045258.appspot.com',
  messagingSenderId: '748017917378'
};

@NgModule({
  declarations: [
    MyApp,
    SettingsPage,
    SessionsPage,
    ModalIdentityPage,
    ModalLanguagePage,
    ModalEditPage,
    HomePage,
    TabsPage,
    PopoverLanguagePage,
    TranscriptionComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingsPage,
    SessionsPage,
    ModalIdentityPage,
    ModalLanguagePage,
    ModalEditPage,
    HomePage,
    TabsPage,
    PopoverLanguagePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Media,
    File,
    SpeechRecognition,
    Device,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SpeechProvider,
    LoadingProvider
  ]
})
export class AppModule {}
