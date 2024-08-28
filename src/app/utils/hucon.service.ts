import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
  })
export class HuconService {
    constructor(private toast: ToastController) {}

    async mostrarMensaje(texto: string, tipo: string = 'success') {
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
}