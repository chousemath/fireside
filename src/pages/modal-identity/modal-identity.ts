import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal-identity',
  templateUrl: 'modal-identity.html',
})
export class ModalIdentityPage {
  identities = [
    { icon: 'beaker', value: 'Bitter-Beaker', style: { color: 'darkgreen' } },
    { icon: 'battery-charging', value: 'Bad-Battery', style: { color: 'darkred' } },
    { icon: 'beer', value: 'Blue-Beer', style: { color: 'darkblue' } },
    { icon: 'logo-bitcoin', value: 'Bold-Bitcoin', style: { color: 'gold' } }
  ];
  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalIdentityPage');
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

}
