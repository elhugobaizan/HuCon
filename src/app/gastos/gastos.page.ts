import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonList, IonButton, IonItem, IonCol } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { GastosService } from './gastos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'hucon-gastos',
  templateUrl: 'gastos.page.html',
  styleUrls: ['gastos.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonCol, IonItem, IonButton, IonList, IonInput, IonHeader, 
    IonToolbar, IonTitle, IonContent, ExploreContainerComponent, CommonModule, 
    FormsModule, ScrollingModule],
})
export class GastosPage { 
  listGastos: any;
  nuevoGasto = this.srv.newGasto();
  montoTotal: number = 0;
  esNuevo: boolean = true;

  constructor(private srv: GastosService) {
    this.list();
    this.nuevoGasto.tipo = 1;
  }

  list() {
    this.srv.listGastos().subscribe({
      next: (data: any) => {
        this.listGastos = data.gastos;
        //this.montoTotal = this.srv.total;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  newGasto() {
    this.nuevoGasto = this.srv.newGasto();
    this.nuevoGasto.tipo = 1;
    //this.nuevoGasto.vence = 0;
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
          this.nuevoGasto = this.srv.newGasto();
          this.esNuevo = true;
        }
      });
    } else {
      this.srv.updateGasto(this.nuevoGasto).subscribe({
        next: (data) => {
          console.log(data);
        }, 
        error: (err) => {

        }
      });
    }
  }

  update(cual: any) {
    this.nuevoGasto.id = cual.id;
    this.nuevoGasto.descripcion = cual.descripcion;
    this.nuevoGasto.monto = cual.monto;
    this.nuevoGasto.tipo = cual.tipo;
    //this.nuevoGasto.vence = cual.vence;
    //this.nuevoGasto.vencimiento = cual.vencimiento;
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

  venceChange(obj: any) {
    //this.nuevoGasto.vence = obj.target.checked;
  }
}
