import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonList, IonButton, IonItem, IonCol } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { BancosService } from './bancos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

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

  constructor(private srv: BancosService) {
    this.list();
  }

  refresh() {
    this.list();
  }

  list() {
    this.srv.listBancos().subscribe({
      next: (data: any) => {
        this.listBancos = data.bancos;
        this.montoTotal.efectivo = this.listBancos.reduce((sum: any, banco: any) => { return sum + banco.efectivo}, 0);
      },
      error: (err) => {
        console.log(err);
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
        next: (data) => {
          console.log(data);
          this.nuevoBanco = this.srv.newBanco();
          this.cancelar();
          this.list();
        }, 
        error: (err) => {
          this.esNuevo = true;
        }
      });
    } else {
      this.srv.updateBanco(this.nuevoBanco).subscribe({
        next: (data) => {
          console.log(data);
          this.nuevoBanco = this.srv.newBanco();
          this.cancelar();
          this.list();
        }, 
        error: (err) => {
          this.esNuevo=true;
        }
      });
    }
  }

  update(cual: any, sliding: any) {
    sliding.close();
    this.nuevoBanco.id = cual.id;
    this.nuevoBanco.nombre = cual.nombre;
    this.nuevoBanco.efectivo = cual.efectivo;
    this.nuevoBanco.alias = cual.alias;
    this.esNuevo = false;
    this.edit = true;
  }

  delete(cual: any, sliding: any) {
    sliding.close();
    this.srv.deleteBanco(cual.id).subscribe({
      next: (data) => {
        console.log(JSON.stringify(data));
        this.list();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  plazofijo(cual: any, sliding: any) {
    sliding.close();
  }
}
