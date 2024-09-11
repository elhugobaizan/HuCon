import { Component, EnvironmentInjector, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonText, IonCard, IonMenu, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonFab, IonFabButton, IonCol, IonRow, IonButton, IonButtons, IonSplitPane, IonHeader, IonContent, IonToolbar, IonTitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonSplitPane, IonButton, IonRow, IonCol, IonFabButton, 
    IonFab, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonButtons,
    IonMenu, IonHeader, IonContent, IonToolbar, IonTitle, IonText, IonCard],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  constructor(private router: Router) {
  }

  home() {
    this.router.navigateByUrl('home');
  }
}
