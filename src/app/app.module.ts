import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { RecentsComponent } from './components/recents/recents.component';
import { MainComponent } from './components/main/main.component';
import { BlogpostComponent } from './components/blogpost/blogpost.component';
import { BlogmainComponent } from './components/blogmain/blogmain.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HomeComponent } from './components/home/home.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { PostNewComponent } from './components/post-new/post-new.component';
import { PostComponent } from './components/post/post.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SolicitudeComponent } from './components/solicitude/solicitude.component';
import { CategoryPostsComponent } from './components/category-posts/category-posts.component';
import { PusherService } from './services/pusher.service';
import { PostService } from './services/post.service';
import { UserService } from './services/user.service';
import { RespostService } from './services/respost.service';
import { CategoryService } from './services/category.service';
import { RoleService } from './services/role.service';
import { DocumentTypeService } from './services/document-type.service';
import { LibDocumentService } from './services/lib-document.service';
import { LibdocumentNewComponent } from './components/libdocument-new/libdocument-new.component';
import { FaqComponent } from './components/faq/faq.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecentsComponent,
    MainComponent,
    BlogpostComponent,
    BlogmainComponent,
    HomeComponent,
    EditUserComponent,
    CategoriesComponent,
    PostNewComponent,
    PostComponent,
    SolicitudeComponent,
    CategoryPostsComponent,
    LibdocumentNewComponent,
    FaqComponent,
  ],
  imports: [
    ReactiveFormsModule,
    AngularFileUploaderModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      progressAnimation: 'increasing'
    }),
    HttpClientModule,
    FormsModule,
    routing,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    InfiniteScrollModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    PdfViewerModule,
    MatMenuModule,
    MatExpansionModule
  ],
  providers: [
    appRoutingProviders,
    PusherService,
    PostService,
    UserService,
    RespostService,
    CategoryService,
    RoleService,
    DocumentTypeService,
    LibDocumentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
