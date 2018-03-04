import { Component, Input } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { PopoverLanguagePage } from '../../pages/popover-language/popover-language';
import * as moment from 'moment';

@Component({
  selector: 'transcription',
  templateUrl: 'transcription.html'
})
export class TranscriptionComponent {
  @Input() public item: any;

  constructor(
    public popoverCtrl: PopoverController
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

}
