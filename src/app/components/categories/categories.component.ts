import { Component, OnInit } from '@angular/core';
import {Category} from '../../models/category';
import {CategoryService} from '../../services/category.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers: [CategoryService]
})
export class CategoriesComponent implements OnInit {

  public categories: [Category];

  constructor(private _categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this._categoryService.getCategories().subscribe(
      response =>{
        if(response.status == 'success'){
          this.categories = response.categories;
        }
      },
      error=>{
        console.log(error);
      }
    );
  }

}
