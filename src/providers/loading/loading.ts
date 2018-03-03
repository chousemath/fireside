import { Injectable } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';

@Injectable()
export class LoadingProvider {
  loading: Loading;
  constructor(
    public loadingCtrl: LoadingController
  ) { }

  show(msg: string) {
    this.loading = this.loadingCtrl.create({ content: msg });
    this.loading.present();
  }

  hide() {
    this.loading.dismiss();
  }
}
