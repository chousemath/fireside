import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { Media, MediaObject } from '@ionic-native/media';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { storage } from 'firebase';
import * as moment from 'moment';
import { Subscription } from 'rxjs/Subscription';

declare let cordova: any;

const fileName: string = 'record.3gp';
const bucket: string = 'gs://amp-test-2e29e.appspot.com/recordings/';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  audioFile: MediaObject;
  filePath: string;
  speechSubscription: Subscription;
  constructor(
    public navCtrl: NavController,
    public file: File,
    public media: Media,
    public db: AngularFireDatabase,
    public storage: AngularFireStorage,
    public speechRecognition: SpeechRecognition
  ) {
  }

  ionViewDidLoad() {
    if (cordova && cordova.file && cordova.file.externalDataDirectory) {
      this.filePath = cordova.file.externalDataDirectory.replace(/file:\/\//g, '');
      console.log('path', this.filePath);
    }
    console.log(this.filePath);
    // Check feature available
    this.speechRecognition
      .isRecognitionAvailable()
      .then((available: boolean) => {
        if (available) {
          this.speechRecognition
            .requestPermission()
            .then(
              () => console.log('Granted'),
              () => console.log('Denied')
            )
        }
      })
  }

  createSession() {
    console.log('new session created');
  }

  record() {
    this.speechSubscription = this.speechRecognition
      .startListening({ language: 'en-US', showPopup: true })
      .subscribe(
        (matches: Array<string>) => console.log(matches[0]),
        (onerror) => console.log('error:', onerror)
      );
  }

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
