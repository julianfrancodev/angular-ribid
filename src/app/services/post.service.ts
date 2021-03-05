import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  public url: string;

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  create(token: string, post: Post): Observable<any> {
    let json = JSON.stringify(post);
    let params = "json=" + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.post(this.url + 'post', params, { headers: headers });

  }

  getPosts(page: number): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'post?page=' + page, { headers: headers });
  }

  getTwoRandomPost(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'post/getrandom/posts', { headers: headers });
  }

  getPost(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'post/' + id, { headers: headers });
  }

  getPendingPosts(page: number): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.get(this.url + 'post/user/get/pending?page=' + page, { headers: headers });
  }

  getCompletePosts(page: number): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.get(this.url + 'post/user/get/complete?page=' + page, { headers: headers });
  }

  getPostByUser(id: string, page: number): Observable<any> {

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.get(this.url + 'post/user/' + id + '?page=' + page, { headers: headers });

  }

  getPostsByCategory(id: string, page: number): Observable<any> {

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.get(this.url + 'post/category/' + id + '?page=' + page, { headers: headers });

  }

  getPostsBySearch(search: string): Observable<any> {

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.get(this.url + 'post/search/posts?search=' + search, { headers: headers });

  }


}
