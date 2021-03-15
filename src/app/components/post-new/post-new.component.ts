import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { Category } from '../../models/category';
import { ToastrService } from 'ngx-toastr';
import { DocumentTypeService } from 'src/app/services/document-type.service';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [UserService, CategoryService, PostService, DocumentTypeService]
})
export class PostNewComponent implements OnInit, DoCheck {

  public identity: any;
  public token: string;
  public post: Post;
  public categories: [Category];
  public documentTypes: any[] = [];
  public showPages: boolean = false;

  constructor(
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _postService: PostService,
    private _documentTypesService: DocumentTypeService,
    private toastr: ToastrService
  ) {
    if (this._userService.getIdentity() == null) {
      this._router.navigate(['']);
    }
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }
  ngDoCheck(): void {
    this.post.document_type_id;

    if (this.post.document_type_id == "2") {
      this.showPages = true;
    } else {
      this.showPages = false;
    }
  }

  ngOnInit(): void {
    this.getCategories();
    this.getDocumentTypes();
    this.post = new Post(1, this.identity.sub, 1, '', '', '', '', '','');
  }

  showSuccessSavedPost() {
    this.toastr.success('Contenido publicado exitosamente');
  }

  createPost(form: any) {
    this.post.title = `${this.post.title} - ${this.post.author}`;
    this._postService.create(this.token, this.post).subscribe(
      response => {
        if (response.status == 'success') {
          this.post = response.post;
          this.showSuccessSavedPost();
          this._router.navigate(['']);
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  getCategories() {
    this._categoryService.getCategories().subscribe(
      response => {
        if (response.status == 'success') {
          this.categories = response.categories;
        }

      },
      error => {
        console.log(error);
      }
    )
  }

  getDocumentTypes() {
    this._documentTypesService.getDocumentTypes().subscribe(
      response => {
        if (response.status === "success") {
          this.documentTypes = response.document_types;
        }
        console.log(this.documentTypes);
      },
      error => {
        console.log(error);
      }
    )
  }

  onInputChange(event: MatSliderChange) {
    this.post.pages = event.value.toString();
  }





}
