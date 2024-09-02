import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Gastos, Gasto} from '../gastos/gastos.models';
import { environment } from 'src/environments/environment';
import { HuconService } from '../utils/hucon.service';
import { Fijo } from './fijos.models';
@Injectable({
  providedIn: 'root'
})
export class FijosService extends Gastos {

  constructor(
    private http: HttpClient,
    public hucon: HuconService
  ) {
    super();
   }

  newGasto(): Fijo {
    let res = new Fijo();
    return res;
  }

  listGastos() {
    return this.http.get(`${environment.server}/fijos`);
  }

  createGasto(body: Fijo) {
    return this.http.post(`${environment.server}/fijos`, body);
  }

  readGasto(id: string) {
    return this.http.get(`${environment.server}/fijos/${id}`);
  }

  updateGasto(body: Fijo) {
    return this.http.patch(`${environment.server}/fijos/${body.id}`,body);
  }

  deleteGasto(id: string) {
    return this.http.delete(`${environment.server}/fijos/${id}`);
  }
}
