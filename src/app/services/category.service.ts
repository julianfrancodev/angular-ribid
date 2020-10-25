import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {global} from './global';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public url: string;



  constructor(private _http: HttpClient) { 
    this.url = global.url;
   }

   getCategories(): Observable<any>{
     let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
     return this._http.get(this.url + 'category', {headers: headers});
   }
}
