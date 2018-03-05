import { Component, Input } from '@angular/core';
import { PopoverController, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { PopoverLanguagePage } from '../../pages/popover-language/popover-language';
import * as moment from 'moment';

@Component({
  selector: 'transcription',
  templateUrl: 'transcription.html'
})
export class TranscriptionComponent {
  @Input() public item: any;

  constructor(
    public popoverCtrl: PopoverController,
    public db: AngularFireDatabase,
    public toastCtrl: ToastController
  ) {
  }

  formatTimestamp(timestamp: number) {
    return moment(1000 * timestamp).format('LTS');
  }

  openPopover() {
    let popover = this.popoverCtrl.create(PopoverLanguagePage, {
      languages: this.item.translations
    });
    popover.onDidDismiss(data => {
      if (data && data.text) {
        this.item.text = data.text;
      }
    });
    popover.present();
  }

  destroyTranscription() {
    let toast;
    this.db
      .object(`recordings/${this.item.deviceId}/trash/${this.item.session}/${this.item.key}`)
      .set(this.item)
      .then(() => {
        this.db
          .object(`recordings/${this.item.deviceId}/${this.item.session}/${this.item.key}`)
          .remove()
          .then(() => {
            toast = this.toastCtrl.create({
              message: 'Transcription deleted!',
              duration: 1200,
              position: 'bottom'
            });
            toast.present();
          })
          .catch(() => {
            toast = this.toastCtrl.create({
              message: 'Problem deleting transcription...',
              duration: 1200,
              position: 'bottom'
            });
            toast.present();
          });
      })
      .catch(() => {
        toast = this.toastCtrl.create({
          message: 'Problem deleting transcription...',
          duration: 1200,
          position: 'bottom'
        });
        toast.present();
      });;
  }

}
