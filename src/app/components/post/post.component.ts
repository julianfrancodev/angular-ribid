import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserService } from 'src/app/services/user.service';
import { PostService } from '../../services/post.service';
import { RespostService } from 'src/app/services/respost.service';

import { Post } from '../../models/post';
import { ResPost } from 'src/app/models/respost';

import { global } from '../../services/global';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [PostService, UserService]
})
export class PostComponent implements OnInit, DoCheck {

  public post: Post;
  public resPost: ResPost;
  public resPostResponse: ResPost;
  public identity: any;
  public token: string;
  public url: string;
  public showFile: boolean;
  public src: string;


  public fileConfig = {
    multiple: false,
    formatsAllowed: ".pdf",
    maxSize: "50",
    uploadAPI: {
      url: global.url + 'respost/upload',
      method: "POST",
      headers: {
        'Authorization': this._userService.getToken()
      },
      responseType: 'json',
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: true,
    fileNameIndex: true,
    replaceTexts: {
      attachPinBtn: 'Seleccionar Archivo',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Fallo al subir el archivo',
      sizeLimit: 'Size Limit'
    }
  };

  constructor(
    private _resPostService: RespostService,
    private _postService: PostService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private toastr: ToastrService,

  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;
  }

  ngOnInit(): void {
    this.getPost();

    if (this.identity) {
      this.resPost = new ResPost(1, '', this.identity.sub, 1, '');
    }

    console.log(this.identity);

    console.log(this.resPost);

    this.getRespostByPost();

  }

  ngDoCheck(): void {

    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.src;

  }

  showSuccessSavedRespost() {
    this.toastr.success('Archivo publicado exitosamente');
  }

  showSuccessSavedFile() {
    this.toastr.success('Archivo cargado con éxito');
  }

  showErrorSavedRespost() {
    this.toastr.error('Archivo publicado exitosamente');
  }

  showSuccessUpdateRespost(){
    this.toastr.success('Archivo Actualizado con éxito');
  }

  getPost() {
    this._route.params.subscribe(params => {
      let id = params["id"];

      this._postService.getPost(id).subscribe(
        response => {
          if (response.status == 'success') {
            this.post = response.post;
          }
          console.log(this.post);
        },
        error => {
          console.log(error);
          this._router.navigate(['']);
        }
      );

    });
  }

  getRespostByPost() {
    this._route.params.subscribe(params => {
      let id = params["id"];

      this._resPostService.getRespostByPost(id).subscribe(
        response => {
          if (response.status === "success") {
            this.resPostResponse = response.respost[0];
            if (this.resPostResponse) {
              this.src = this.url + "respost/file/" + this.resPostResponse.file_res;
            }
          }

          console.log(response);
          console.log(this.resPostResponse);
        },
        error => {
          console.log(error);
        }
      )
    })
  }

  createRespost(form: any) {

    this.resPost.post_id_res = this.post.id;

    console.log(this.resPost);

    this._resPostService.create(this.token, this.resPost).subscribe(
      response => {
        if (response.status == "success") {
          this.showSuccessSavedRespost();
          this._router.navigate(['']);
        }
      },
      error => {
        console.log(error);
        this.showSuccessSavedRespost();
      }
    )

  }

  updateRespost(form: any) {

    this.resPost.post_id_res = this.post.id;
    console.log(this.resPost);

    this._resPostService.update(this.token, this.resPost).subscribe(
      response => {
        console.log(response)
        if(response.status == "success"){
          this.src = this.url + 'respost/file/' + response.changes.file_res;
        }
      },
      error => {
        console.log(error);
      }
    )
  }


  fileUpload(data: any) {
    console.log(data);
    this.showSuccessSavedFile();
    this.resPost.file_res = data.body.file;
  }

}
