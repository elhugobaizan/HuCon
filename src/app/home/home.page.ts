import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonInput, IonList, IonButton, IonItem, IonCol, IonRow, IonModal } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ButtonBoxComponent } from '../componentes/button-box/button-box.component';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActionPerformed, PushNotifications, PushNotificationSchema, Token } from '@capacitor/push-notifications';
import { HuconService } from '../utils/hucon.service';
import * as moment from 'moment';
import { Capacitor } from '@capacitor/core';
import { InversionesService } from '../inversiones/inversiones.service';
import { LoadingController } from '@ionic/angular';
import { Config } from '../config/config.models';
import { ConfigService } from '../config/config.service';

@Component({
  selector: 'hucon-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonCol, IonItem, IonButton, IonList, IonInput, IonHeader, IonModal,
    IonRow, IonToolbar, IonTitle, IonContent, IonCard, ExploreContainerComponent, CommonModule, 
    FormsModule, ScrollingModule, ButtonBoxComponent],
})
export class HomePage implements OnInit{
  public efectivo: number = 0;
  public porPagar: number = 0;
  public invertido: number = 0;
  public gananciaDia: number = 0;
  public acumuladoMes: number = 0;
  public gastado: number = 0;
  public maximoPorDia: number = 0;
  public diasDelMes: number = moment().daysInMonth();

  public isModalOpen: boolean = false;
  public efectivoObj: Config = new Config();

  today: string = moment().format('YYYY-MM-DD');
  public vencimientos:any = {
    inversion: '',
    fijo: ''
  };

  constructor(private http: HttpClient,
    private router: Router,
    private loader: LoadingController,
    private hucon: HuconService,
    private srv: InversionesService,
    private config: ConfigService
  ) {
    this.refresh();
  }

  ngOnInit(): void {
    const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');
    if(isPushNotificationsAvailable){
      this.initPushNotifications();
    }
  }

  async refresh() {
    const l = await this.loader.create();
    l.present();
    this.hucon.showMessage('refreshing...', 'info');
    this.srv.calculateDailyEarnings().then((res: any) => {
      this.gananciaDia = res.reduce((sum: any, gasto: any) => { return sum + parseFloat(gasto.earn)}, 0);
    })
    this.getEfectivo();
    this.getVencimientos();
    this.getGastosDelDia();
    this.getInvertido();
    l.dismiss();
  } 

  getConfig() {
    this.config.readConfig("efectivo").subscribe({
      next: (data: any) => {
        this.efectivoObj = data.res[0];
        console.log(data.res[0]);
        this.isModalOpen = true;
      }
    });
  }

  salvarConfig() {
    this.http.get(`${environment.server}/extras/efectivo`).subscribe({
    });
  }

  getEfectivo() {
    this.http.get(`${environment.server}/extras/efectivo`).subscribe({
      next: (data: any) => {
        this.efectivo = parseFloat(data.efectivo[0].total);
        this.getFijosDelMes();
      },
      error: (err) => {
        this.hucon.processError(err);
      }
    });
  }

  getInvertido() {
    this.http.get(`${environment.server}/extras/invertido`).subscribe({
      next: (data: any) => {
        this.invertido = parseFloat(data.efectivo[0].total);
      },
      error: (err) => {
        this.hucon.processError(err);
      }
    });
  }

  getVencimientos() {
    this.http.get(`${environment.server}/extras/vencimientos`).subscribe({
      next: (data: any) => {
        this.vencimientos.inversion = data.vencimientos[0].inversion ? data.vencimientos[0].inversion.toString().split('T')[0] : '';;
        this.vencimientos.fijo = data.vencimientos[0].fijo ? data.vencimientos[0].fijo.toString().split('T')[0] : '';;
      },
      error: (err) => {
        this.hucon.processError(err);
      }
    });
  }

  getGastosDelDia() {
    this.http.get(`${environment.server}/gastos/dia`).subscribe({
      next: (data: any) => {
        this.gastado = data.gastos[0].total;
      },
      error: (err) => {
        this.hucon.processError(err);
      }
    });
  }

  calcGastoMaximoDiario() {
    let hoy = new Date()
    let dias:number = new Date(hoy.getFullYear(), hoy.getMonth()+1, 0).getDate();
    this.maximoPorDia = (this.efectivo - this.porPagar) / dias;   
    this.acumuladoMes = (this.efectivo - this.porPagar) / (dias - hoy.getDate());
  }

  getFijosDelMes() {
    this.http.get(`${environment.server}/fijos/mes`).subscribe({
      next: (data: any) => {
        this.porPagar = data.fijos[0].total;
        this.calcGastoMaximoDiario();
      },
      error: (err) => {
        this.hucon.processError(err);
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
          this.hucon.presentAlert(notification.title!, notification.body!, null, null);
      });

      PushNotifications.addListener('pushNotificationActionPerformed', 
        (notification: ActionPerformed) => {
          
        });
  }

}