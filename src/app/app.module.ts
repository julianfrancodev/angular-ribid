import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule } from '@angular/forms';
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
import { ErrorComponent } from './components/error/error.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { PostNewComponent } from './components/post-new/post-new.component';
import { PostComponent } from './components/post/post.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PdfViewerModule } from "ng2-pdf-viewer";
import { SolicitudeComponent } from './components/solicitude/solicitude.component';
import { CategoryPostsComponent } from './components/category-posts/category-posts.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecentsComponent,
    MainComponent,
    BlogpostComponent,
    BlogmainComponent,
    HomeComponent,
    ErrorComponent,
    EditUserComponent,
    CategoriesComponent,
    PostNewComponent,
    PostComponent,
    SolicitudeComponent,
    CategoryPostsComponent,
  ],
  imports: [
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
    PdfViewerModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    InfiniteScrollModule
  ],
  providers: [
    appRoutingProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
