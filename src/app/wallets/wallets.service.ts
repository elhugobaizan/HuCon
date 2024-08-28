import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Wallets, Wallet} from './wallets.models';
import { environment } from 'src/environments/environment';
import { HuconService } from '../utils/hucon.service';
@Injectable({
  providedIn: 'root'
})
export class WalletsService extends Wallets {

  constructor(
    private http: HttpClient,
    public hucon: HuconService
  ) {
    super();
   }

  newWallet(): Wallet {
    let res = new Wallet();
    return res;
  }

  listWallets() {
    return this.http.get(`${environment.server}/wallets`);
  }

  createWallet(body: Wallet) {
    return this.http.post(`${environment.server}/wallets`, body);
  }

  readWallet(id: string) {
    return this.http.get(`${environment.server}/wallets/${id}`);
  }

  updateWallet(body: Wallet) {
    return this.http.patch(`${environment.server}/wallets/${body.id}`,body);
  }

  deleteWallet(id: string) {
    return this.http.delete(`${environment.server}/wallets/${id}`);
  }
}