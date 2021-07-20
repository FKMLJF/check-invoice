import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CanActivateUser} from "./_services/can.active"
import {CreateInvoiceComponent} from "./create-invoice/create-invoice.component";
import {UpdateInvoiceComponent} from "./update-invoice/update-invoice.component";
import {DeleteInvoiceComponent} from "./delete-invoice/delete-invoice.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [CanActivateUser] },
  { path: 'user', component: BoardUserComponent, canActivate: [CanActivateUser] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [CanActivateUser] },
  { path: 'create-invoice', component: CreateInvoiceComponent, canActivate: [CanActivateUser] },
  { path: 'create-invoice/:id', component: UpdateInvoiceComponent, canActivate: [CanActivateUser] },
  { path: 'delete-invoice/:id', component: DeleteInvoiceComponent, canActivate: [CanActivateUser] },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
//canActivate: [CanActivateUser]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanActivateUser, Permissions]
})
export class AppRoutingModule { }
