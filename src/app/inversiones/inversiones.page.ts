import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonList, IonButton, IonItem, IonCol } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { InversionesService } from './inversiones.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Banco, Inversion } from './inversiones.models';
import { HuconService } from '../utils/hucon.service';

@Component({
  selector: 'hucon-inversiones',
  templateUrl: 'Inversiones.page.html',
  styleUrls: ['Inversiones.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonCol, IonItem, IonButton, IonList, IonInput, IonHeader, 
    IonToolbar, IonTitle, IonContent, ExploreContainerComponent, CommonModule, 
    FormsModule, ScrollingModule],
})
export class InversionesPage { 
  listObjs: Array<any> = new Array();
  nuevoObj = this.srv.newInversion();
  montoTotal: number = 0;
  listBancos: Banco[] = [];
  bancoSel: Banco = new Banco();
  esNuevo: boolean = true;
  edit: boolean = false;
  template: any = {
    title: "Inversiones"
  }

  constructor(
    private srv: InversionesService,
    private hucon: HuconService) {
    this.list();
    this.bancos();
  }

  bancos() {
    this.srv.listBancos().subscribe({
      next: (data: any) => {
        this.listBancos = data.bancos;
      },
      error: (err) => {
        this.hucon.processError(err);
      }
    });
  }

  refresh() {
    this.listObjs = [];
    this.montoTotal = 0;
    this.hucon.showMessage('Refreshing', 'Info');
    this.list();
  }

  list() {
    this.srv.listInversiones().subscribe({
      next: (data: any) => {
        data.inversiones.forEach((element: Inversion) => {
          let venc = element.vencimiento ? element.vencimiento.toString().split('T')[0] : '';
          let temp = {
            ID: element.ID, 
            id_banco: element.id_banco, 
            nombre: element.nombre, 
            monto: element.monto, 
            tasa: element.tasa, 
            vencimiento: venc,
            tipo: element.tipo
          };
          this.listObjs.push(temp);
        });

        this.montoTotal = this.listObjs.reduce((sum: any, inversion: any) => { return sum + inversion.monto}, 0);
      },
      error: (err) => {
        this.hucon.processError(err);
      }
    });
  }

  newInversion() {
    this.nuevoObj = this.srv.newInversion();
    this.esNuevo = true;
    this.edit = true;
  }

  cancelar() {
    this.nuevoObj = this.srv.newInversion();
    this.esNuevo = true;
    this.edit = false;
  }

  save() {
    if(this.esNuevo) {
      this.srv.createInversion(this.nuevoObj).subscribe({
        next: (data: any) => {
          this.hucon.showMessage(data.message);
          this.cancelar();
          this.list();
        }, 
        error: (err) => {
          this.hucon.processError(err);
          this.esNuevo = true;
        }
      });
    } else {
      this.srv.updateInversion(this.nuevoObj).subscribe({
        next: (data: any) => {
          this.hucon.showMessage(data.message);
          this.cancelar();
          this.list();
        }, 
        error: (err) => {
          this.hucon.processError(err);
          this.esNuevo = true;
        }
      });
    }
  }

  update(cual: any, sliding: any) {
    sliding.close();
    this.nuevoObj.ID = cual.ID;
    this.nuevoObj.nombre = cual.nombre;
    this.nuevoObj.monto = cual.monto;
    this.nuevoObj.id_banco = cual.id_banco;
    this.nuevoObj.tasa = cual.tasa;
    this.nuevoObj.vencimiento = cual.vencimiento;
    this.nuevoObj.tipo = cual.tipo;
    this.esNuevo = false;
    this.edit = true;
  }

  delete(cual: any, sliding: any) {
    sliding.close();
    this.srv.deleteInversion(cual.ID).subscribe({
      next: (data) => {
        this.hucon.showMessage(JSON.stringify(data));
        this.list();
      },
      error: (err) => {
        this.hucon.processError(err);
      }
    });
  }
}
