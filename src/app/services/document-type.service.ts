import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {

  public url: string;


  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  getDocumentTypes(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'document-type', { headers: headers });
  }
}
