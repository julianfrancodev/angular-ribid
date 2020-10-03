import {Injectable} from '@angular/core';
import {global} from './global';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from '../models/user';

@Injectable()

export class UserService{

    public url: string;
    
    constructor( public _http: HttpClient){
       this.url = global.url
    }

    test(){
        return 'Hello from service';
    }

     register(user: User): Observable<any>{
        let json = JSON.stringify(user);
        let params = 'json='+json;

        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

        return this._http.post(this.url+'user/register/',params, {headers: headers} );

    }
}