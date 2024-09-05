import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Configs, Config} from './config.models';
import { environment } from 'src/environments/environment';
import { HuconService } from '../utils/hucon.service';
@Injectable({
  providedIn: 'root'
})
export class ConfigService extends Configs {

  constructor(
    private http: HttpClient,
    public hucon: HuconService
  ) {
    super();
   }

  newConfig(): Config {
    let res = new Config();
    return res;
  }

  listConfigs() {
    return this.http.get(`${environment.server}/config`);
  }

  createConfig(body: Config) {
    return this.http.post(`${environment.server}/config`, body);
  }

  readConfig(id: string) {
    return this.http.get(`${environment.server}/config/${id}`);
  }

  updateConfig(body: Config) {
    return this.http.patch(`${environment.server}/config/${body.ID}`,body);
  }

  deleteConfig(id: string) {
    return this.http.delete(`${environment.server}/config/${id}`);
  }
}
