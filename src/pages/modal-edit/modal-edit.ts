import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { SpeechProvider } from '../../providers/speech/speech';

/**
 * Generated class for the ModalEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-edit',
  templateUrl: 'modal-edit.html',
})
export class ModalEditPage {
  text: string;
  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public speech: SpeechProvider
  ) {
  }

  ionViewDidLoad() {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  updateText() {
    this.viewCtrl.dismiss({
      text: this.text
    });
  }

}
