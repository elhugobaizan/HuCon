import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonInput, IonList, IonButton, IonItem, IonCol, IonRow } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
//import { HomeService } from './home.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ButtonBoxComponent } from '../componentes/button-box/button-box.component';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActionPerformed, PushNotifications, PushNotificationSchema, Token } from '@capacitor/push-notifications';
import { HuconService } from '../utils/hucon.service';
import { addIcons } from "ionicons";

@Component({
  selector: 'hucon-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonCol, IonItem, IonButton, IonList, IonInput, IonHeader, 
    IonRow, IonToolbar, IonTitle, IonContent, IonCard, ExploreContainerComponent, CommonModule, 
    FormsModule, ScrollingModule, ButtonBoxComponent],
})
export class HomePage implements OnInit{
  public efectivo: number = 0;
  public porPagar: number = 0;
  public invertido: number = 0;
  public vencimientos:any = {
    inversion: 0,
    fijo: 0
  };
  public gastado: number = 0;
  public maximoPorDia: number = 0;

  constructor(private http: HttpClient,
    private router: Router,
    private hucon: HuconService
  ) {
    this.refresh();
  }

  ngOnInit(): void {
    this.initPushNotifications();
  }

  refresh() {
    console.log('refreshing...');
    this.getEfectivo();
    this.getVencimientos();
    this.getGastosDelDia();
    this.getInvertido();
  } 

  config() {
    this.router.navigateByUrl('config');
  }

  getEfectivo() {
    this.http.get(`${environment.server}/extras/efectivo`).subscribe({
      next: (data: any) => {
        this.efectivo = parseFloat(data.efectivo[0].total);
        this.getFijosDelMes();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getInvertido() {
    this.http.get(`${environment.server}/extras/invertido`).subscribe({
      next: (data: any) => {
        this.invertido = parseFloat(data.efectivo[0].total);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getVencimientos() {
    this.http.get(`${environment.server}/extras/vencimientos`).subscribe({
      next: (data: any) => {
        this.vencimientos = data.vencimientos[0];
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getGastosDelDia() {
    this.http.get(`${environment.server}/gastos/dia`).subscribe({
      next: (data: any) => {
        this.gastado = data.gastos[0].total;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  calcGastoMaximoDiario() {
    let hoy = new Date()
    let dias:number = new Date(hoy.getFullYear(), hoy.getMonth()+1, 0).getDate();
    console.log(this.porPagar);
    this.maximoPorDia = (this.efectivo - this.porPagar) / dias;    
  }

  getFijosDelMes() {
    this.http.get(`${environment.server}/fijos/mes`).subscribe({
      next: (data: any) => {
        this.porPagar = data.fijos[0].total;
        this.calcGastoMaximoDiario();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  initPushNotifications() {
    PushNotifications.requestPermissions().then(result => {
      if(result.receive === 'granted') {
        PushNotifications.register();
      } else {
        this.hucon.showMessage('No tiene permiso', 'warning');
      } 
      });

      // On success, we should be able to receive notifications
      PushNotifications.addListener('registration',
        (token: Token) => {
          //this.hucon.showMessage('Push registration success, token: ' + token.value, 'warning');
          console.log(token.value);
        }
      );

      // Some issue with our setup and push will not work
      PushNotifications.addListener('registrationError',
        (error: any) => {
          this.hucon.processError(error);
        }
      );

      PushNotifications.addListener('pushNotificationReceived', 
        (notification: PushNotificationSchema) => {

          this.hucon.presentAlert(notification.title!, notification.body!);
      });

      PushNotifications.addListener('pushNotificationActionPerformed', 
        (notification: ActionPerformed) => {
          
        });
  }

}