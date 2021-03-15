import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LibDocument } from '../models/libdocument';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class LibDocumentService {

  public url: string;

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  create(token: string, libDocument: LibDocument): Observable<any>{
    let json = JSON.stringify(libDocument);

    let params = "json="+json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', token);

    return this._http.post(this.url + 'libdocument', params, {headers: headers});

  }

  getLibDocuments(): Observable<any>{

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.get(this.url + 'libdocument', {headers: headers});
  }

  getLibDocumentsByUser(id: number, page: number): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.get(this.url + 'libdocument/get/libdocumentbyuser/'+id +'?page='+page, {headers: headers});
  }

}
