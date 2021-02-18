import { Injectable } from '@angular/core';
import { global } from './global';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable()

export class UserService {

    public url: string;
    public identity: any;
    public token: string;

    constructor(public _http: HttpClient) {
        this.url = global.url
    }

    test() {
        return 'Hello from user service';
    }

    register(user: User): Observable<any> {
        var json = JSON.stringify(user);
        var params = 'json=' + json;

        var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url + 'user/register', params, { headers: headers });

    }

    signin(user: any, gettoken = null): Observable<any> {

        if (gettoken != null) {
            user.gettoken = 'true';
        }

        var json = JSON.stringify(user);
        var params = 'json=' + json;
        var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url + 'user/login', params, { headers: headers });
    }

    update(token: string, user: User): Observable<any> {
        var json = JSON.stringify(user);

        var params = "json=" + json;

        var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.put(this.url + 'user/update', params, { headers: headers });

    }

    getIdentity() {
        var identity = JSON.parse(localStorage.getItem('indentity'));

        if (identity && identity != "undefined") {
            this.identity = identity;

        } else {
            this.identity = null;
        }

        return this.identity;
    }

    getToken() {
        let token = localStorage.getItem('token');

        if (token && token != 'undefined') {
            this.token = token;
        } else {
            this.token = null;
        }

        return this.token;


    }


}