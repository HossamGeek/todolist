import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ToastrModule } from 'ng6-toastr-notifications';
/*Form*/
import {FormsModule} from '@angular/forms';

/*service*/
import {ConnectService} from './services/connect.service';
import {HttpModule} from '@angular/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


/*Routeing*/
import {Router, RouterModule, Routes} from '@angular/router';

/*components*/
import {AppComponent} from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { TodolistComponent } from './components/todolist/todolist.component';

/*router*/
const approutes: Routes = [
  { path: '', redirectTo: 'home' , pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'home', component: HomeComponent},
  { path: 'todolist', component: TodolistComponent},
  { path: '**',      component: AppComponent },

];



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    
    TodolistComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(approutes),
    ToastrModule.forRoot() 
  ],
  providers: [ConnectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
