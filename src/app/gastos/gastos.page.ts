import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonList, IonButton, IonItem, IonCol } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { GastosService } from './gastos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HuconService } from '../utils/hucon.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'hucon-gastos',
  templateUrl: 'gastos.page.html',
  styleUrls: ['gastos.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonCol, IonItem, IonButton, IonList, IonInput, IonHeader, 
    IonToolbar, IonTitle, IonContent, ExploreContainerComponent, CommonModule, 
    FormsModule, ScrollingModule]
})
export class GastosPage {
  listGastos: any;
  nuevoGasto = this.srv.newGasto();
  montoTotal: number = 0;
  esNuevo: boolean = true;
  edit: boolean = false;
  template: any = {
    title: "Gastos"
  }

  constructor(
    private srv: GastosService,
    private loader: LoadingController,
    private hucon: HuconService) {
    this.list();
  }

  refresh() {
    this.hucon.showMessage('Refreshing...','info');
    this.listGastos = [];
    this.montoTotal = 0;
    this.list();
  } 
    
  async list() {
    const l = await this.loader.create();
    l.present();
    this.srv.listGastos().subscribe({
      next: (data: any) => {
        this.listGastos = data.gastos;
        this.montoTotal = this.listGastos.reduce((sum: any, gasto: any) => { return sum + gasto.monto}, 0);
        l.dismiss();
      },
      error: (err) => {
        this.hucon.processError(err);
        l.dismiss();
      }
    });
  }

  newGasto() {
    this.nuevoGasto = this.srv.newGasto();
    this.esNuevo = true;
    this.edit = true;
  }

  cancelar() {
    this.nuevoGasto = this.srv.newGasto();
    this.esNuevo = true;
    this.edit = false;
  }

  save() {
    if(this.esNuevo) {
      this.srv.createGasto(this.nuevoGasto).subscribe({
        next: (data: any) => {
          this.hucon.showMessage(data.message);
          this.cancelar();
          this.refresh();
        }, 
        error: (err) => {
          this.hucon.processError(err);
          this.esNuevo = true;
        }
      });
    } else {
      this.srv.updateGasto(this.nuevoGasto).subscribe({
        next: (data: any) => {
          this.hucon.showMessage(data.message);
          this.cancelar();
          this.refresh();
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
    this.nuevoGasto.ID = cual.ID;
    this.nuevoGasto.descripcion = cual.descripcion;
    this.nuevoGasto.monto = cual.monto;
    console.log(this.nuevoGasto);
    this.esNuevo = false;
    this.edit = true;
  }

  delete(cual: any, sliding: any) {
    sliding.close();
    this.hucon.presentAlert("Borrar gasto", "estas seguro de borrar?",
      () => {
        
      },
      () => {
        this.srv.deleteGasto(cual.ID).subscribe({
          next: (data: any) => {
            this.hucon.showMessage(data.message);
            this.list();
          },
          error: (err: any) => {
            this.hucon.processError(err);
          }
        });
      }
    );
  }
}
