import { Component, OnInit, DoCheck } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { LibDocument } from 'src/app/models/libdocument';
import { CategoryService } from 'src/app/services/category.service';
import { DocumentTypeService } from 'src/app/services/document-type.service';
import { global } from 'src/app/services/global';
import { LibDocumentService } from 'src/app/services/lib-document.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-libdocument-new',
  templateUrl: './libdocument-new.component.html',
  styleUrls: ['./libdocument-new.component.css'],
  providers: [DocumentTypeService, CategoryService, LibDocumentService, UserService]
})
export class LibdocumentNewComponent implements OnInit, DoCheck {

  public identity: any;
  public token: string;
  public libDocument: LibDocument;
  public categories: [Category];
  public documentTypes: [any];
  public showPages: boolean = false;

  public fileConfig = {
    multiple: false,
    formatsAllowed: ".pdf",
    maxSize: "50",
    uploadAPI: {
      url: global.url + 'libdocument/upload',
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
    private _documentTypeService: DocumentTypeService,
    private _categoryService: CategoryService,
    private _libDocumentService: LibDocumentService,
    private _userService: UserService,
    private toastr: ToastrService,
    private _router: Router
  ) {
    if (this._userService.getIdentity() == null) {
      this._router.navigate(['']);
    }
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }
  ngDoCheck(): void {
    this.libDocument.document_type_id;

    if (this.libDocument.document_type_id == "2") {
      this.showPages = true;
    } else {
      this.showPages = false;
    }
  }

  ngOnInit(): void {
    this.getCategories();
    this.getDocumentTypes();
    this.libDocument = new LibDocument(1, this.identity.sub, '', '', '', '', '', '', '', '');
  }

  showSuccessSavedLibDocument() {
    this.toastr.success('Contenido guardado exitosamente');
  }

  showSuccessSavedFile() {
    this.toastr.success('Archivo cargado con éxito');
  }

  showWarningDocument(message: string) {
    this.toastr.warning(message);
  }

  createLibDocument(form: any) {
    this._libDocumentService.create(this.token, this.libDocument).subscribe(
      response => {
       if(response.status == 'success'){
        this.showSuccessSavedLibDocument();
        this._router.navigate(['']);
       }
      },
      error => {
        this.showWarningDocument(error.error.message);
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
    this._documentTypeService.getDocumentTypes().subscribe(
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
    this.libDocument.pages = event.value.toString();
  }

  fileUpload(data: any) {
    console.log(data);
    this.showSuccessSavedFile();
    this.libDocument.file_lib = data.body.file;
  }

}
