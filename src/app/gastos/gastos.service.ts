import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Gastos, Gasto} from './gastos.models';
import { environment } from 'src/environments/environment';
import { HuconService } from '../utils/hucon.service';
@Injectable({
  providedIn: 'root'
})
export class GastosService extends Gastos {

  constructor(
    private http: HttpClient,
    public hucon: HuconService
  ) {
    super();
   }

  newGasto(): Gasto {
    let res = new Gasto();
    return res;
  }

  listGastos() {
    return this.http.get(`${environment.server}/gastos`);
  }

  createGasto(body: Gasto) {
    return this.http.post(`${environment.server}/gastos`, body);
  }

  readGasto(id: string) {
    return this.http.get(`${environment.server}/gastos/${id}`);
  }

  updateGasto(body: Gasto) {
    return this.http.patch(`${environment.server}/gastos/${body.ID}`,body);
  }

  deleteGasto(id: string) {
    return this.http.delete(`${environment.server}/gastos/${id}`);
  }
}
