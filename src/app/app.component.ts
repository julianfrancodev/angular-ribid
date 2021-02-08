import { Component } from '@angular/core';
import { CategoryService } from './services/category.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CategoryService, UserService]
})
export class AppComponent {
  title = 'ribid';
}
