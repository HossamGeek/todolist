import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ConnectService {
  url = 'https://todolistback.herokuapp.com';
  headers = null;
  options = null;
  constructor(public  http: Http) {
    this.headers = new  Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
    this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append('Access-Control-Allow-Headers', 'X-Requested-With , Content-Type, Origin, ' +
      'Authorization, Accept, Client-Security-Token, Accept-Encoding');

    this.options = new RequestOptions({ headers: this.headers });

  }
  login(data){
    return this.http.post(this.url + '/user/login', data,this.options).pipe(map(res => res.json()));
  }
  register(data){
    return this.http.post(this.url + '/user/register', data,this.options).pipe(map(res => res.json()));
  }
  addToDo(data,user_id) {
    this.headers.set("user_id",user_id)
    return this.http.post(this.url + '/todo', data,this.options).pipe(map(res => res.json()));
  }
  getToDo(user_id) {
    this.headers.set("user_id",user_id)
    return this.http.get(this.url + '/todo', this.options).pipe(map(res => res.json()));
  }

  deleteToDo(list_id) {
    console.log(list_id)
    this.headers.set("list_id",list_id)
    return this.http.delete(this.url + '/todo', this.options).pipe(map(res => res.json()));
  }
  editToDo(user_id,list_id,data) {
    
    this.headers.set("list_id",list_id)
    this.headers.set("user_id",user_id)
    return this.http.put(this.url + '/todo', data,this.options).pipe(map(res => res.json()));
  }
  
}
