import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonList, IonButton, IonItem, IonCol } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { WalletsService } from './wallets.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'hucon-gastos',
  templateUrl: 'wallets.page.html',
  styleUrls: ['wallets.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonCol, IonItem, IonButton, IonList, IonInput, IonHeader, 
    IonToolbar, IonTitle, IonContent, ExploreContainerComponent, CommonModule, 
    FormsModule, ScrollingModule],
})
export class WalletsPage { 
  listObjs: Array<any> = new Array();
  nuevoObj = this.srv.newWallet();
  montoTotal: number = 0;
  esNuevo: boolean = true;
  template: any = {
    title: "Wallets"
  }

  constructor(private srv: WalletsService) {
    this.list();
  }

  list() {
    this.srv.listWallets().subscribe({
      next: (data: any) => {
        this.listObjs = data.wallets;
        this.montoTotal = this.listObjs.reduce((sum: any, wallet: any) => { return sum + wallet.capital}, 0);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  newWallet() {
    this.nuevoObj = this.srv.newWallet();
    this.esNuevo = true;
  }

  save() {
    if(this.esNuevo) {
      this.srv.createWallet(this.nuevoObj).subscribe({
        next: (data) => {
          console.log(data);
          this.nuevoObj = this.srv.newWallet();
          this.esNuevo = true;
          this.list();
        }, 
        error: (err) => {
          this.esNuevo = true;
        }
      });
    } else {
      this.srv.updateWallet(this.nuevoObj).subscribe({
        next: (data) => {
          console.log(data);
          this.nuevoObj = this.srv.newWallet();
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
    this.nuevoObj.nombre = cual.nombre;
    this.nuevoObj.capital = cual.capital;
    this.esNuevo = false;
  }

  delete(cual: any) {
    this.srv.deleteWallet(cual.id).subscribe({
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
