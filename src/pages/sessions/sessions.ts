import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { SpeechProvider } from '../../providers/speech/speech';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-sessions',
  templateUrl: 'sessions.html',
})
export class SessionsPage {

  sessions: Array<any> = [];
  sessions$: Subscription;
  transcriptions: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase,
    public speech: SpeechProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log(`recordings/${this.speech.deviceId}`);
    this.sessions$ = this.db.list(`recordings/${this.speech.deviceId}`).valueChanges().subscribe(sessions => {
      this.sessions = _.orderBy(sessions, ['key'], ['desc']);
      this.transcriptions = _.remove(_.orderBy(this.sessions[0], ['key'], ['desc']), e => e.text);
      console.log('sessions', this.sessions);
      console.log('transactions', this.transcriptions);
    });
  }

  ionViewWillUnload() {
    this.sessions$.unsubscribe();
  }

}
