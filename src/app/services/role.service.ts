import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  public url: string;

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }


  getRoles(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'rol', { headers: headers });

  }
}
