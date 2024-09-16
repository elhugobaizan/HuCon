import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonList, IonButton, IonItem, IonCol } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { ConfigService } from './config.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { GastosService } from '../gastos/gastos.service';

@Component({
  selector: 'hucon-config',
  templateUrl: '../utils/hucon.template.html',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonCol, IonItem, IonButton, IonList, IonInput, IonHeader, 
    IonToolbar, IonTitle, IonContent, ExploreContainerComponent, CommonModule, 
    FormsModule, ScrollingModule],
})
export class ConfigPage {
  listObjs: any;
  nuevoObj = this.srv.newConfig();
  montoTotal: number = 0;
  esNuevo: boolean = true;
  template: any = {
    title: "Config",
    validate: (this.nuevoObj.nombre==='')
  }

  constructor(private srv: ConfigService) {
    this.list();
  }

  refresh() {
    this.list();
  } 
    
  list() {
    this.srv.listConfigs().subscribe({
      next: (data: any) => {
        this.listObjs = data.config;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  newObj() {
    this.nuevoObj = this.srv.newConfig();
    this.esNuevo = true;
  }

  save() {
    if(this.esNuevo) {
      this.srv.createConfig(this.nuevoObj).subscribe({
        next: (data) => {
          console.log(data);
          this.newObj();
          this.list();
        }, 
        error: (err) => {
          this.esNuevo = true;
        }
      });
    } else {
      this.srv.updateConfig(this.nuevoObj).subscribe({
        next: (data) => {
          console.log(data);
          this.newObj();
          this.list();
        }, 
        error: (err) => {
          this.esNuevo = true;
        }
      });
    }
  }

  update(cual: any) {
    this.nuevoObj.ID = cual.ID;
    this.nuevoObj.nombre = cual.nombre;
    this.nuevoObj.valor = cual.valor;
    this.esNuevo = false;
  }

  delete(cual: any) {
    this.srv.deleteConfig(cual.ID).subscribe({
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
