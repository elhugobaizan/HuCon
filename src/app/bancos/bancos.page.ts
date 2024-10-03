import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonList, IonButton, IonItem, IonCol } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { BancosService } from './bancos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HuconService } from '../utils/hucon.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'hucon-bancos',
  templateUrl: 'bancos.page.html',
  styleUrls: ['bancos.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonCol, IonItem, IonButton, IonList, IonInput, IonHeader, 
    IonToolbar, IonTitle, IonContent, ExploreContainerComponent, CommonModule, 
    FormsModule, ScrollingModule],
})
export class BancosPage { 
  listBancos: any;
  nuevoBanco = this.srv.newBanco();
  montoTotal = {
    efectivo: 0
  };
  esNuevo: boolean = true;
  edit: boolean = false;
  template: any = {
    title:"Bancos"
  }

  constructor(
    private srv: BancosService,
    private loader: LoadingController,
    private hucon: HuconService) {
    this.list();
  }

  refresh() {
    this.hucon.showMessage('Refreshing...','info');
    this.listBancos = [];
    this.montoTotal.efectivo = 0;
    this.list();
  }

  async list() {
    const l = await this.loader.create();
    l.present();
    this.srv.listBancos().subscribe({
      next: (data: any) => {
        this.listBancos = data.bancos;
        this.montoTotal.efectivo = this.listBancos.reduce((sum: any, banco: any) => { return sum + banco.efectivo}, 0);
        l.dismiss();
      },
      error: (err) => {
        this.hucon.processError(err);
        l.dismiss();
      }
    });
  }

  newBanco() {
    this.nuevoBanco = this.srv.newBanco();
    this.esNuevo = true;
    this.edit = true;
  }

  cancelar() {
    this.nuevoBanco = this.srv.newBanco();
    this.esNuevo = true;
    this.edit = false;
  }

  save() {
    if(this.esNuevo) {
      this.srv.createBanco(this.nuevoBanco).subscribe({
        next: (data: any) => {
          this.hucon.showMessage(data);
          this.cancelar();
          this.list();
        }, 
        error: (err) => {
          this.hucon.processError(err.message);
          this.esNuevo = true;
        }
      });
    } else {
      this.srv.updateBanco(this.nuevoBanco).subscribe({
        next: (data: any) => {
          this.hucon.showMessage(data);
          this.cancelar();
          this.list();
        }, 
        error: (err) => {
          this.hucon.processError(err.message);
          this.esNuevo=true;
        }
      });
    }
  }

  update(cual: any, sliding: any) {
    sliding.close();
    this.nuevoBanco.ID = cual.ID;
    this.nuevoBanco.nombre = cual.nombre;
    this.nuevoBanco.efectivo = cual.efectivo;
    this.nuevoBanco.alias = cual.alias;
    this.esNuevo = false;
    this.edit = true;
  }

  delete(cual: any, sliding: any) {
    sliding.close();
    this.srv.deleteBanco(cual.ID).subscribe({
      next: (data: any) => {
        this.hucon.showMessage(data.message);
        this.list();
      },
      error: (err: any) => {
        this.hucon.showMessage(err.message);
      }
    });
  }

  plazofijo(cual: any, sliding: any) {
    sliding.close();
  }
}
