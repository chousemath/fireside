import { Component } from '@angular/core';

import { SettingsPage } from '../settings/settings';
import { SessionsPage } from '../sessions/sessions';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SessionsPage;
  tab3Root = SettingsPage;

  constructor() {

  }
}
