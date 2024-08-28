import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Bancos, Banco} from './bancos.models';
import { environment } from 'src/environments/environment';
import { HuconService } from '../utils/hucon.service';

@Injectable({
  providedIn: 'root'
})
export class BancosService extends Bancos {

  constructor(
    private router: Router,
    private http: HttpClient,
    public hucon: HuconService
  ) {
    super();
    this.hucon.mostrarMensaje('entering expenses service');
   }

  newBanco(): Banco {
    let res = new Banco();
    return res;
  }

  listBancos() {
    this.hucon.mostrarMensaje('entering banks service');
    return this.http.get(`${environment.server}/bancos`);
  }

  createBanco(body: Banco) {
    return this.http.post(`${environment.server}/bancos`, body);
  }

  readBanco(id: string) {
    return this.http.get(`${environment.server}/bancos/${id}`);
  }

  updateBanco(body: Banco) {
    return this.http.patch(`${environment.server}/bancos/${body.id}`,body);

  }

  deleteBanco(id: string) {
    return this.http.delete(`${environment.server}/bancos/${id}`);
  }
}
