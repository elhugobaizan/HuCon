import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Inversiones, Inversion} from './inversiones.models';
import { environment } from 'src/environments/environment';
import { HuconService } from '../utils/hucon.service';
@Injectable({
  providedIn: 'root'
})
export class InversionesService extends Inversiones {

  constructor(
    private http: HttpClient,
    public hucon: HuconService
  ) {
    super();
   }

  listBancos() {
    return this.http.get(`${environment.server}/bancos`);
  }

  newInversion(): Inversion {
    let res = new Inversion();
    return res;
  }

  listInversiones() {
    return this.http.get(`${environment.server}/inversiones`);
  }

  createInversion(body: Inversion) {
    return this.http.post(`${environment.server}/inversiones`, body);
  }

  readInversion(id: string) {
    return this.http.get(`${environment.server}/inversiones/${id}`);
  }

  updateInversion(body: Inversion) {
    return this.http.patch(`${environment.server}/inversiones/${body.ID}`,body);
  }

  deleteInversion(id: string) {
    return this.http.delete(`${environment.server}/inversiones/${id}`);
  }
}