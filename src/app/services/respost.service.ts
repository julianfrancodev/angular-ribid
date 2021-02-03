import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http"; 
import { Observable } from "rxjs";
import { ResPost } from "../models/respost";
import {global} from "./global";

@Injectable({
  providedIn: 'root'
})
export class RespostService {

  public url: string;


  constructor(private _http: HttpClient) {
    this.url = global.url;
   }

   create(token: string, respost: ResPost): Observable<any>{
     let json = JSON.stringify(respost);

     let params = "json=" + json;

     let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
     .set('Authorization', token);

     return this._http.post(this.url + 'respost', params, { headers: headers });

   }

}
