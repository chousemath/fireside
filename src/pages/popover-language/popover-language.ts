import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import * as _ from 'lodash';

const languages = {
  af: 'Afrikaans',
  ar: 'Arabic',
  az: 'Azeerbaijani',
  de: 'German',
  en: 'English',
  es: 'Spanish',
  eu: 'Basque',
  fi: 'Finnish',
  fr: 'French',
  hy: 'Armenian',
  id: 'Indonesian',
  it: 'Italian',
  ja: 'Japanese',
  ko: 'Korean',
  pl: 'Polish',
  pt: 'Portuguese',
  ru: 'Russian',
  sq: 'Albanian',
  sv: 'Swedish',
  vi: 'Vietnamese',
  zhCn: 'Chinese (Mainland)',
  zhTw: 'Chinese (Taiwan)'
};

@IonicPage()
@Component({
  selector: 'page-popover-language',
  templateUrl: 'popover-language.html',
})
export class PopoverLanguagePage {
  languages: Array<any> = [];
  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    _.forOwn(this.navParams.get('languages'), (value, key) => {
      if (key !== 'timestamp') {
        this.languages.push({ key: key, name: languages[key], value: value.text });
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverLanguagePage');
  }

  dismiss(language) {
    this.viewCtrl.dismiss({
      key: language.key,
      text: language.value,
      name: language.name
    });
  }

}
