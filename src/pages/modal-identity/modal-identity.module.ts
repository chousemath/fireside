import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalIdentityPage } from './modal-identity';

@NgModule({
  declarations: [
    ModalIdentityPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalIdentityPage),
  ],
})
export class ModalIdentityPageModule {}
