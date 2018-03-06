import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { PopoverController, ToastController, ModalController, Toast, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { PopoverLanguagePage } from '../../pages/popover-language/popover-language';
import * as moment from 'moment';
import { ModalEditPage } from '../../pages/modal-edit/modal-edit';

@Component({
  selector: 'transcription',
  templateUrl: 'transcription.html'
})
export class TranscriptionComponent implements OnInit, OnChanges {
  @Input() public item: any;
  @Input() public languageCode: string;

  displayText: string;

  constructor(
    public popoverCtrl: PopoverController,
    public db: AngularFireDatabase,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController
  ) {
  }

  ngOnInit() {
    console.log('this.languageCode', this.languageCode);
    console.log('this.item', this.item);

    if (this.languageCode && this.item.translations) {
      this.displayText = this.item.translations[this.languageCode].text;
    } else {
      this.displayText = this.item.text;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes);
    if (changes && changes.languageCode && changes.languageCode.currentValue) {
      this.displayText = this.item.translations[changes.languageCode.currentValue].text;
    }
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

  archiveTranscription() {
    let toast: Toast;
    this.db
      .object(`recordings/${this.item.deviceId}/archive/${this.item.session}/${this.item.key}`)
      .set(this.item)
      .then(() => {
        this.db
          .object(`recordings/${this.item.deviceId}/${this.item.session}/${this.item.key}`)
          .remove()
          .then(() => {
            toast = this.toastCtrl.create({
              message: 'Transcription archived!',
              duration: 1200,
              position: 'bottom'
            });
            toast.present();
          })
          .catch(() => {
            toast = this.toastCtrl.create({
              message: 'Problem archiving transcription...',
              duration: 1200,
              position: 'bottom'
            });
            toast.present();
          });
      })
      .catch(() => {
        toast = this.toastCtrl.create({
          message: 'Problem archiving transcription...',
          duration: 1200,
          position: 'bottom'
        });
        toast.present();
      });;
  }

  destroyTranscription() {
    let toast: Toast;
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

  editTranscription() {
    let toast: Toast;
    const modal = this.modalCtrl.create(ModalEditPage);
    modal.onDidDismiss(data => {
      if (data && data.text) {
        this.db.object(`recordings/${this.item.deviceId}/${this.item.session}/${this.item.key}`).update({
          text: data.text
        }).then(() => {
          toast = this.toastCtrl.create({
            message: 'Text successfully updated!',
            duration: 1200,
            position: 'bottom'
          });
          toast.present();
        }).catch(() => {
          toast = this.toastCtrl.create({
            message: 'Problem updating text...',
            duration: 1200,
            position: 'bottom'
          });
          toast.present();
        });
      }
    });
    modal.present();
  }

  openActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Options',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.destroyTranscription();
          }
        },
        {
          text: 'Archive',
          handler: () => {
            this.archiveTranscription();
          }
        },
        {
          text: 'Edit Text',
          handler: () => {
            this.editTranscription();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
