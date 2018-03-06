import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-modal-session-select',
  templateUrl: 'modal-session-select.html',
})
export class ModalSessionSelectPage {
  items: Array<any> = [];
  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.items = this.navParams.get('sessions');
  }

  ionViewDidLoad() {
  }

  dismiss(data) {
    this.viewCtrl.dismiss({
      sessionKey: data
    });
  }

  formatTimestamp(timestamp: number) {
    return moment.unix(timestamp).format('MMMM Do YYYY, h:mm:ss a');
  }

}
