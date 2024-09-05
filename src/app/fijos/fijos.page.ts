import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonSelect, IonSelectOption, IonItemOptions, IonItemOption, IonItemSliding, IonContent, IonInput, IonList, IonButton, IonItem, IonCol } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { FijosService } from './fijos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HuconService } from '../utils/hucon.service';
import { Servicio } from './fijos.models';
import { addIcons } from "ionicons";

@Component({
  selector: 'hucon-fijos',
  templateUrl: 'fijos.page.html',
  styleUrls: ['fijos.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonCol, IonItem, IonButton, IonList, IonInput, IonHeader, 
    IonToolbar, IonTitle, IonContent, IonItemOptions, IonItemOption, IonSelect, IonSelectOption, IonItemSliding, ExploreContainerComponent, CommonModule, 
    FormsModule, ScrollingModule],
})
export class FijosPage {
  listObjs: any;
  listServicios: Servicio[] = [];
  servicioSel: Servicio = new Servicio();
  nuevoObj = this.srv.newGasto();
  montoTotal: number = 0;
  esNuevo: boolean = true;
  edit: boolean = false;
  template: any = {
    title: "Gastos fijos"
  }

  constructor(private srv: FijosService,
    private hucon: HuconService
  ) {
    this.list();
    this.servicios();
  }

  servicios() {
    this.srv.listServicios().subscribe({
      next: (data: any) => {
        this.listServicios = data.servicios;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  pagar(cual: any, sliding: any) {
    sliding.close();
    this.nuevoObj = cual;
    this.nuevoObj.pagado = 1;
    this.esNuevo = false;
    alert('estas seguro que queres pagar?' + this.nuevoObj.nombre);
    console.log(this.nuevoObj);
    this.save();
  }

  onSelectChange(e: any) {
    console.log(JSON.stringify(e.detail.value));
    this.nuevoObj.id_servicio = e.detail.value.ID;
    this.nuevoObj.nombre = e.detail.value.nombre;
  }

  refresh() {
    console.log('refreshing...');
    this.list();
  } 
    
  list() {
    this.srv.listGastos().subscribe({
      next: (data: any) => {
        this.listObjs = data.fijos;
        this.montoTotal = this.listObjs.reduce((sum: any, gasto: any) => { 
          return gasto.pagado===0 ? sum + gasto.monto : sum;
        }, 0);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  cancelar() {
    this.nuevoObj = this.srv.newGasto();
    this.esNuevo = true;
    this.edit = false;
  }

  newGasto() {
    this.nuevoObj = this.srv.newGasto();
    this.esNuevo = true;
    this.edit = true;
  }

  save() {
    if(this.esNuevo) {
      this.srv.createGasto(this.nuevoObj).subscribe({
        next: (data) => {
          this.newGasto();
          this.esNuevo = true;
          this.list();
          this.hucon.showMessage('Saved');
          this.edit = false;
        }, 
        error: (err) => {
          this.hucon.processError(err);
          this.esNuevo = true;
        }
      });
    } else {
      console.log(this.nuevoObj);
      this.srv.updateGasto(this.nuevoObj).subscribe({
        next: (data) => {
          this.newGasto();
          this.esNuevo = true;
          this.list();
          this.hucon.showMessage('Updated');
          this.edit = false;
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
    this.nuevoObj.id_servicio = cual.id_servicio;
    this.servicioSel = new Servicio(cual.id_servicio, cual.nombre);
    this.nuevoObj.monto = cual.monto;
    this.nuevoObj.mes = cual.mes;
    let temp = cual.vencimiento ? cual.vencimiento.split('T')[0] : new Date();
    this.nuevoObj.vencimiento = temp;
    this.nuevoObj.nombre = cual.nombre;
    this.esNuevo = false;
    this.edit = true;
    console.log(this.nuevoObj);
  }

  delete(cual: any, sliding: any) {
    sliding.close();
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
