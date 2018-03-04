import { Injectable } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { Device } from '@ionic-native/device';
import { Events } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Subscription } from 'rxjs/Subscription';
import { LoadingProvider } from '../../providers/loading/loading';
import * as moment from 'moment';
import * as _ from 'lodash';

const languageCodes = {
  'af-ZA': 'Afrikaans - South Africa',
  'af-AZ': 'Azeri (Azerbaijan)',
  'id-ID': 'Indonesian (Indonesia)',
  'ms-MY': 'Malay (Malaysia)',
  'jv-ID': 'jv-ID',
  'su-ID': 'su-ID',
  'ca-ES': 'Catalan (Spain)',
  'cs-CZ': 'Czech (Czech Republic)',
  'da-DK': 'Danish (Denmark)',
  'de-DE': 'German (Germany)',
  'en-AU': 'English (Australia)',
  'en-CA': 'English (Canada)',
  'en-001': 'English',
  'en-GH': 'English (Ghana)',
  'en-IN': 'English (India)',
  'en-IE': 'English (Ireland)',
  'en-KE': 'English (Kenya)',
  'en-NZ': 'English (New Zealand)',
  'en-NG': 'English (Nigeria)',
  'en-PH': 'English (Philippines)',
  'en-ZA': 'English (South Africa)',
  'en-TZ': 'English (Tanzania)',
  'en-GB': 'English (United Kingdom)',
  'en-US': 'English (United States)',
  'es-AR': 'Spanish (Argentina)',
  'es-BO': 'Spanish (Bolivia)',
  'es-CL': 'Spanish (Chile)',
  'es-CO': 'Spanish (Colombia)',
  'es-CR': 'Spanish (Costa Rica)',
  'es-EC': 'Spanish (Ecuador)',
  'es-US': 'English (United States)',
  'es-SV': 'Spanish (El Salvador)',
  'es-ES': 'Spanish (Castilian)',
  'es-GT': 'Spanish (Guatemala)',
  'es-HN': 'Spanish (Honduras)',
  'es-MX': 'Spanish (Mexico)',
  'es-NI': 'Spanish (Nicaragua)',
  'es-PA': 'Spanish (Panama)',
  'es-PY': 'Spanish (Paraguay)',
  'es-PE': 'Spanish (Peru)',
  'es-PR': 'Spanish (Puerto Rico)',
  'es-DO': 'Spanish (Dominican Republic)',
  'es-UY': 'Spanish (Uruguay)',
  'es-VE': 'Spanish (Venezuela)',
  'eu-ES': 'Basque (Spain)',
  'fil-PH': 'fil-PH',
  'fr-FR': 'French (France)',
  'fr-CA': 'French (Canada)',
  'gl-ES': 'Galician (Spain)',
  'hr-HR': 'Croatian (Croatia)',
  'zu-ZA': 'Zulu (South Africa)',
  'is-IS': 'Icelandic (Iceland)',
  'it-IT': 'Italian (Italy)',
  'sw': 'Swahili',
  'sw-TZ': 'Swahili (Tanzania',
  'lv-LV': 'Latvian (Latvia)',
  'lt-LT': 'Lithuanian (Lithuania)',
  'hu-HU': 'Hungarian (Hungary)',
  'nl-NL': 'Dutch (Netherlands)',
  'nb-NO': 'Norwegian(Norway)',
  'pl-PL': 'Polish (Poland)',
  'pt-BR': 'Portuguese (Brazil)',
  'pt-PT': 'Portuguese (Portugal)',
  'ro-RO': 'Romanian (Romania)',
  'sl-SI': 'Slovenian (Slovenia)',
  'sk-SK': 'Slovak (Slovakia)',
  'fi-FI': 'Finnish (Finland)',
  'sv-SE': 'Swedish (Sweden)',
  'vi-VN': 'Vietnamese (Viet Nam)',
  'tr-TR': 'Turkish (Turkey)',
  'el-GR': 'Greek (Greece)',
  'bg-BG': 'Bulgarian (Bulgaria)',
  'ru-RU': 'Russian (Russia)',
  'sr-RS': 'sr-RS',
  'uk-UA': 'Ukrainian (Ukraine)',
  'ka-GE': 'Georgian (Georgia)',
  'hy-AM': 'Armenian (Armenia)',
  'he-IL': 'Hebrew (Israel)',
  'ar-IL': 'Arabic (Israel)',
  'ar-JO': 'Arabic (Jordan)',
  'ar-AE': 'Arabic (U.A.E.)',
  'ar-BH': 'Arabic (Bahrain)',
  'ar-DZ': 'Arabic (Algeria)',
  'ar-SA': 'Arabic (Saudi Arabia)',
  'ar-KW': 'Arabic (Kuwait)',
  'ar-MA': 'Arabic (Morocco)',
  'ar-TN': 'Arabic (Tunisia)',
  'ar-OM': 'Arabic (Oman)',
  'ar-PS': 'Arabic (Palestine)',
  'ar-QA': 'Arabic (Qatar)',
  'ar-LB': 'Arabic (Lebanon)',
  'ar-EG': 'Arabic (Egypt)',
  'fa-IR': 'Farsi (Iran)',
  'ur-PK': 'Urdu (Islamic Republic of Pakistan)',
  'ur-IN': 'Urdu',
  'am-ET': 'am-ET',
  'ko-KR': 'Korean (Korea)',
  'cmn-Hans-CN': 'Mandarin (Simplified, China)',
  'cmn-Hans-HK': 'Mandarin (Simplified, Hong Kong)',
  'cmn-Hant-TW': 'Mandarin (Traditional, Taiwan)',
  'yue-Hant-HK': 'Cantonese (Traditional, Hong Kong)',
  'ja-JP': 'Japanese (Japan)'
};

@Injectable()
export class SpeechProvider {

  speechSubscription: Subscription;
  transcription: string = '';
  session: number = 0;
  languages: Array<string> = [];
  deviceId: string = this.device.uuid;
  speechLanguage: string = 'en-US';
  identity: string = 'Red-Dragon';

  constructor(
    public events: Events,
    public db: AngularFireDatabase,
    public speech: SpeechRecognition,
    private device: Device,
    private loading: LoadingProvider
  ) {
    // Check feature available
    this.speech
      .isRecognitionAvailable()
      .then((available: boolean) => {
        if (available) {
          this.speech
            .requestPermission()
            .then(
              () => this.initializeSpeech(),
              () => console.log('Speech recognition permission denied')
            )
        }
      })
  }

  createSession() {
    this.session = moment().unix();
    this.events.publish('session:created', this.session);
  }

  initializeSpeech() {
    this.getSupportedLanguages();
  }

  getSupportedLanguages() {
    this.loading.show('Fetching languages...');
    this.speech.getSupportedLanguages().then(languages => {
      this.languages = _.map(languages, lang => {
        if (lang in languageCodes) return { key: lang, value: languageCodes[lang] };
        else return { key: lang, value: lang }
      });
      this.events.publish('languages:fetched', this.languages);
      this.loading.hide();
    }).catch(err => console.log(err));
  }

  recordVoice() {
    this.speechSubscription = this.speech
      .startListening({ language: this.speechLanguage, showPopup: true })
      .subscribe(
        (matches: Array<string>) => this.saveTranscription(matches[0]),
        (onerror) => console.log('error:', onerror)
      );
  }

  private saveTranscription(text: string) {
    if (this.session === 0) {
      this.session = moment().unix();
      this.events.publish('session:created', this.session);
    }
    this.transcription = text;
    this.events.publish('transcription:created', text);
    const key = moment().unix();
    this.db.object(`recordings/${this.deviceId}/${this.session}/${key}`).update({
      identity: this.identity,
      key: key,
      text: text,
      language: this.speechLanguage,
      deviceId: this.deviceId,
      session: this.session
    }).then(() => console.log('update successful')).catch(err => console.log(err));
  }

}
