import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { ErrorComponent } from './components/error/error.component';
import {HomeComponent} from './components/home/home.component';
import {EditUserComponent} from './components/edit-user/edit-user.component';
import {PostNewComponent} from './components/post-new/post-new.component';
import { PostComponent } from './components/post/post.component';

const appRoutes: Routes =[
    {path:'', component: HomeComponent},
    {path:'edit', component: EditUserComponent},
    {path:'new-post', component: PostNewComponent},
    {path: 'post/:id', component: PostComponent },
    {path:'**', component: ErrorComponent}
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' });