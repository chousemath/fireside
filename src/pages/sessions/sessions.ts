import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, PopoverController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AngularFireDatabase } from 'angularfire2/database';
import { SpeechProvider } from '../../providers/speech/speech';
import { Subscription } from 'rxjs/Subscription';
import { ModalSessionSelectPage } from '../modal-session-select/modal-session-select';
import { PopoverLanguagePage } from '../popover-language/popover-language';
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
  languageCode: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase,
    public speech: SpeechProvider,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public socialSharing: SocialSharing
  ) {
  }

  ionViewWillLoad() {
    console.log(`recordings/${this.speech.deviceId}`);
    this.sessions$ = this.db
      .list(`recordings/${this.speech.deviceId}`)
      .valueChanges()
      .subscribe(sessions => {
        this.sessions = _.remove(_.orderBy(sessions, ['key'], ['desc']), s => !['trash', 'archive'].includes(s.key));
        this.transcriptions = _.remove(_.orderBy(this.sessions[0], ['key'], ['desc']), e => e.text);
      });
  }

  ionViewWillUnload() {
    this.sessions$.unsubscribe();
  }

  openSessionsModal() {
    const modal = this.modalCtrl.create(ModalSessionSelectPage, {
      sessions: this.sessions
    });
    modal.onDidDismiss(data => {
      if (data && data.sessionKey) {
        this.transcriptions = _.remove(_.orderBy(this.sessions[_.findIndex(this.sessions, s => s.key === data.sessionKey)], ['key'], ['desc']), e => e.text);
      }
    });
    modal.present();
  }

  openLanguagePopover() {
    let popover = this.popoverCtrl.create(PopoverLanguagePage, {
      languages: this.transcriptions[0].translations
    });
    popover.onDidDismiss(data => {
      if (data && data.text) {
        this.languageCode = data.key;
      }
    });
    popover.present();
  }

  shareLink() {
    this.socialSharing.share(
      'Please open this url in your favorite browser to follow this conversation.',
      'Fireside - Conversation',
      null,
      `https://fireside-a5812.firebaseapp.com/sessions/${this.transcriptions[0].deviceId}xxxxxxx${this.transcriptions[0].session}`
    );
  }

}
