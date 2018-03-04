import { Component } from '@angular/core';
import { NavController, Events, ModalController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Media, MediaObject } from '@ionic-native/media';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { storage } from 'firebase';
import * as moment from 'moment';
import { SpeechProvider } from '../../providers/speech/speech';

import { ModalIdentityPage } from '../modal-identity/modal-identity';
import { ModalLanguagePage } from '../modal-language/modal-language';

declare let cordova: any;

const fileName: string = 'record.3gp';
const bucket: string = 'gs://amp-test-2e29e.appspot.com/recordings/';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  logo: string = 'assets/imgs/campfire.gif';
  audioFile: MediaObject;
  filePath: string;
  transcription: string;
  languages: Array<string> = [];
  session: number;
  speechLanguage: string;
  identity: string;

  constructor(
    public navCtrl: NavController,
    public events: Events,
    public file: File,
    public media: Media,
    public db: AngularFireDatabase,
    public storage: AngularFireStorage,
    public speech: SpeechProvider,
    public modalCtrl: ModalController
  ) {
  }

  ionViewDidLoad() {
    if (cordova && cordova.file && cordova.file.externalDataDirectory) {
      this.filePath = cordova.file.externalDataDirectory.replace(/file:\/\//g, '');
      console.log('path', this.filePath);
    }

    this.events.subscribe('transcription:created', (transcription: string) => {
      this.transcription = transcription;
    });

    this.events.subscribe('session:created', (session: number) => {
      this.session = session;
    });

    this.events.subscribe('languages:fetched', (languages: Array<string>) => {
      this.languages = languages;
    });
  }

  selectLanguage() {
    let modal = this.modalCtrl.create(ModalLanguagePage, {
      languages: this.languages
    });
    modal.onDidDismiss(data => {
      this.speechLanguage = data.value;
      this.speech.speechLanguage = data.key;
    });
    modal.present();
  }

  identify() {
    let modal = this.modalCtrl.create(ModalIdentityPage);
    modal.onDidDismiss(data => {
      this.identity = data.value;
      this.speech.identity = data.value;
    });
    modal.present();
  }

  createSession() { this.speech.createSession(); }

  record() { this.speech.recordVoice(); }

  transcribe() {
    // The name of the audio file to transcribe
    // Reads a local audio file and converts it to base64
    console.log('----------------');
    console.log(this.filePath + fileName);
    console.log('----------------');
    this.file.readAsDataURL(cordova.file.externalDataDirectory, fileName).then(audioBytes => {
      let audioBlob = this.uriToBlob(audioBytes)
      let metadata = { 'contentType': audioBlob.type };
      const key = moment().unix();
      let ref = storage().ref(`recordings/${key}.3gp`);

      ref.put(audioBlob, metadata)
        .then(snapshot => ref.getDownloadURL())
        .then(url => {
          console.log(bucket + key + '.3gp');
          console.log(url);
          this.db.object(`recordings/${key}`).update({
            key: key,
            bucket: bucket + key + '.3gp',
            url: url
          }).then(() => console.log('update successful')).catch(err => console.log(err));
        })
        .catch(err => console.log(err));

    }).catch(err => console.log(err));
  }

  // Function to convert dataURI to Blob needed by Firebase
  private uriToBlob(dataURI) {
    const dataArr = dataURI.split(',');
    let binary = atob(dataArr[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) array.push(binary.charCodeAt(i));
    return new Blob([new Uint8Array(array)], { type: 'audio/3gpp' });
  }

}
