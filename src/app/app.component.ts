import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { defineCustomElement as defineToast } from '@ionic/core/components/ion-toast.js';
import { defineCustomElement as defineLoading } from '@ionic/core/components/ion-loading';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    defineToast();
    defineLoading();
  }
}
