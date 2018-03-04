import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import * as _ from 'lodash';

const languages = {
  af: 'Afrikaans',
  de: 'German',
  en: 'English',
  es: 'Spanish',
  fi: 'Finnish',
  fr: 'French',
  id: 'Indonesian',
  it: 'Italian',
  ja: 'Japanese',
  ko: 'Korean',
  pl: 'Polish',
  pt: 'Portuguese',
  ru: 'Russian',
  sv: 'Swedish',
  vi: 'Vietnamese',
  'zh-cn': 'Chinese (Mainland)',
  'zh-tw': 'Chinese (Taiwan)'
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

  dismiss(value: string) {
    this.viewCtrl.dismiss({ text: value });
  }

}
