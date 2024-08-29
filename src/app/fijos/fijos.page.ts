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
  listGastos: any;
  nuevoGasto = this.srv.newGasto();
  montoTotal: number = 0;
  esNuevo: boolean = true;

  constructor(private srv: FijosService) {
    this.list();
    this.nuevoGasto.tipo = 0;
  }

  list() {
    this.srv.listGastos().subscribe({
      next: (data: any) => {
        this.listGastos = data.gastos;
        this.montoTotal = this.listGastos.reduce((sum: any, gasto: any) => { return sum + gasto.monto}, 0);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  newGasto() {
    this.nuevoGasto = this.srv.newGasto();
    this.nuevoGasto.tipo = 0;
    this.nuevoGasto.vence = 1;
    this.esNuevo = true;
  }

  save() {
    if(this.esNuevo) {
      this.srv.createGasto(this.nuevoGasto).subscribe({
        next: (data) => {
          console.log(data);
          this.nuevoGasto = this.srv.newGasto();
          this.esNuevo = true;
          this.list();
        }, 
        error: (err) => {
          this.esNuevo = true;
        }
      });
    } else {
      this.srv.updateGasto(this.nuevoGasto).subscribe({
        next: (data) => {
          console.log(data);
          this.nuevoGasto = this.srv.newGasto();
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
    this.nuevoGasto.id = cual.id;
    this.nuevoGasto.descripcion = cual.descripcion;
    this.nuevoGasto.monto = cual.monto;
    this.nuevoGasto.tipo = cual.tipo;
    this.nuevoGasto.vence = cual.vence;
    this.nuevoGasto.vencimiento = cual.vencimiento;
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
