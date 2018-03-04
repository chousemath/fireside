import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal-language',
  templateUrl: 'modal-language.html',
})
export class ModalLanguagePage {
  languages: Array<any>;
  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.languages = this.navParams.get('languages');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalLanguagePage');
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

}
