import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';
import { environment } from './global';

@Injectable({
  providedIn: 'root'
})
export class PusherService {
  public pusher: any;
  public channel: any;
  public usersChannel: any;

  constructor() {
    this.pusher = new Pusher(environment.pusher.key, {
      cluster: environment.pusher.cluster
    });
    this.channel = this.pusher.subscribe('posts');
    this.usersChannel = this.pusher.subscribe('resposts');
  }

}
