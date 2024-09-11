import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

const huConServer: string = environment.server;

@Injectable({
    providedIn: 'root'
  })
export class HuconService {
    constructor(private toast: ToastController,
      private alert: AlertController,
      private http: HttpClient
    ) {}

    async presentAlert(title: string, message: string) {
      let a = await this.alert.create({
        header: title,
        message: message,
        buttons: ['Aceptar']
      });
      a.present();
    }

    compareDate(date1: string, date2: string) {
      let d1 = new Date(date1);
      let d2 = new Date(date2);
      console.log(d1,d2)
      return d1.getDay()===d2.getDay() && d1.getMonth()===d2.getMonth() && d1.getFullYear()===d2.getFullYear();
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
      this.showMessage(err.error, 'danger');
    }
}