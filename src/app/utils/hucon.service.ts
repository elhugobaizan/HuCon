import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
  })
export class HuconService {
    constructor(private toast: ToastController,
      private alert: AlertController
    ) {}

    async presentAlert(title: string, message: string) {
      let a = await this.alert.create({
        header: title,
        message: message,
        buttons: ['Aceptar']
      });
      a.present();
    }

    async showMessage(texto: string, tipo: string = 'success') {
        let t = await this.toast.create({
          message: texto,
          color: tipo,
          buttons: [{
            text: 'Dismiss',
            role: 'cancel'
          }]
        });
        t.present();
    }

    processError(err: any) {
      console.log(err);
      this.showMessage(err.error.message.message, 'danger');
    }
}