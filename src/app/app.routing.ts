import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { ErrorComponent } from './components/error/error.component';
import {HomeComponent} from './components/home/home.component';
import {EditUserComponent} from './components/edit-user/edit-user.component';

const appRoutes: Routes =[
    {path:'', component: HomeComponent},
    {path:'edit', component: EditUserComponent},
    {path:'**', component: ErrorComponent}
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
