import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonList, IonButton, IonItem, IonCol } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { InversionesService } from './inversiones.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Banco } from './inversiones.models';

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

  constructor(private srv: InversionesService) {
    this.list();
    this.bancos();
  }

  bancos() {
    this.srv.listBancos().subscribe({
      next: (data: any) => {
        this.listBancos = data.bancos;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  refresh() {
    this.list();
  }

  list() {
    this.srv.listInversiones().subscribe({
      next: (data: any) => {
        this.listObjs = data.inversiones;
        this.montoTotal = this.listObjs.reduce((sum: any, inversion: any) => { return sum + inversion.monto}, 0);
      },
      error: (err) => {
        console.log(err);
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
        next: (data) => {
          console.log(data);
          this.cancelar();
          this.list();
        }, 
        error: (err) => {
          this.esNuevo = true;
        }
      });
    } else {
      this.srv.updateInversion(this.nuevoObj).subscribe({
        next: (data) => {
          console.log(data);
          this.cancelar();
          this.list();
        }, 
        error: (err) => {
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
    this.esNuevo = false;
    this.edit = true;
  }

  delete(cual: any, sliding: any) {
    sliding.close();
    this.srv.deleteInversion(cual.id).subscribe({
      next: (data) => {
        console.log(JSON.stringify(data));
        this.list();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
