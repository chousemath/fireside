import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopoverLanguagePage } from './popover-language';

@NgModule({
  declarations: [
    PopoverLanguagePage,
  ],
  imports: [
    IonicPageModule.forChild(PopoverLanguagePage),
  ],
})
export class PopoverLanguagePageModule {}
