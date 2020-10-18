import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { Category } from '../../models/category';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [UserService, CategoryService, PostService]
})
export class PostNewComponent implements OnInit {

  public identity: any;
  public token: string;
  public post: Post;
  public categories: [Category];
  public options: Object = {
    placeholderText: 'Escribe o pega parte de tu documento',

  }

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private toastr: ToastrService
  ) {
    if (this._userService.getIdentity() == null) {
      this._router.navigate(['']);
    }
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.getCategories();
    this.post = new Post(1, this.identity.sub, 1, '', '', null, null);
    console.log(this.post);
  }

  showSuccessSavedPost() {
    this.toastr.success('Message from post!!');
  }

  createPost(form: any) {

  }

  getCategories(){
    this._categoryService.getCategories().subscribe(
      response => {
        if(response.status == 'success'){
          this.categories = response.categories;
        }
      },
      error=>{
          console.log(error);
      }
    )
  }



}
