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
  montoTotal: number = 0;
  esNuevo: boolean = true;

  constructor(private srv: BancosService) {
    this.list();
  }

  list() {
    this.srv.listBancos().subscribe({
      next: (data: any) => {
        this.listBancos = data.gastos;
        //this.montoTotal = this.srv.total;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  newBanco() {
    this.nuevoBanco = this.srv.newBanco();
    this.esNuevo = true;
  }

  save() {
    if(this.esNuevo) {
      this.srv.createBanco(this.nuevoBanco).subscribe({
        next: (data) => {
          console.log(data);
          this.nuevoBanco = this.srv.newBanco();
          this.esNuevo = true;
          this.list();
        }, 
        error: (err) => {
          this.nuevoBanco = this.srv.newBanco();
          this.esNuevo = true;
        }
      });
    } else {
      this.srv.updateBanco(this.nuevoBanco).subscribe({
        next: (data) => {
          console.log(data);
        }, 
        error: (err) => {

        }
      });
    }
  }

  update(cual: any) {
    this.nuevoBanco.id = cual.id;
    this.nuevoBanco.nombre = cual.nombre;
    this.nuevoBanco.capital = cual.capital;
    this.esNuevo = false;
  }

  delete(cual: any) {
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
}
