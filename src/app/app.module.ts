import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {routing, appRoutingProviders} from './app.routing';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RecentsComponent } from './components/recents/recents.component';
import { MainComponent } from './components/main/main.component';
import { BlogpostComponent } from './components/blogpost/blogpost.component';
import { BlogmainComponent } from './components/blogmain/blogmain.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RecentsComponent,
    MainComponent,
    BlogpostComponent,
    BlogmainComponent,
    HomeComponent,
    ErrorComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 5000,
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
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    appRoutingProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
