import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonList, IonButton, IonItem, IonCol } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { FijosService } from './fijos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'hucon-fijos',
  templateUrl: 'fijos.page.html',
  styleUrls: ['fijos.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonCol, IonItem, IonButton, IonList, IonInput, IonHeader, 
    IonToolbar, IonTitle, IonContent, ExploreContainerComponent, CommonModule, 
    FormsModule, ScrollingModule],
})
export class FijosPage {
  listObjs: any;
  nuevoObj = this.srv.newGasto();
  montoTotal: number = 0;
  esNuevo: boolean = true;
  template: any = {
    title: "Gastos fijos"
  }

  constructor(private srv: FijosService) {
    this.list();
  }

  refresh() {
    this.list();
  } 
    
  list() {
    this.srv.listGastos().subscribe({
      next: (data: any) => {
        this.listObjs = data.fijos;
        this.montoTotal = this.listObjs.reduce((sum: any, gasto: any) => { return sum + gasto.monto}, 0);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  newGasto() {
    this.nuevoObj = this.srv.newGasto();
    this.esNuevo = true;
  }

  save() {
    if(this.esNuevo) {
      this.srv.createGasto(this.nuevoObj).subscribe({
        next: (data) => {
          console.log(data);
          this.newGasto();
          this.esNuevo = true;
          this.list();
        }, 
        error: (err) => {
          this.esNuevo = true;
        }
      });
    } else {
      this.srv.updateGasto(this.nuevoObj).subscribe({
        next: (data) => {
          console.log(data);
          this.newGasto();
          this.esNuevo = true;
          this.list();
        }, 
        error: (err) => {
          this.esNuevo = true;
        }
      });
    }
  }

  update(cual: any) {
    this.nuevoObj.id = cual.id;
    this.nuevoObj.id_servicio = cual.id_servicio;
    this.nuevoObj.monto = cual.monto;
    this.nuevoObj.mes = cual.vence;
    this.nuevoObj.vencimiento = cual.vencimiento;
    this.esNuevo = false;
  }

  delete(cual: any) {
    this.srv.deleteGasto(cual.id).subscribe({
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
