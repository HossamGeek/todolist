import { Component, OnInit } from '@angular/core';
import { ConnectService } from '../../services/connect.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  errdb=false;
  errmsg = '';
  email:any;
  f_name:any;
  user_id:any;
  l_name:any;
  name:any;
  all_to_do = [];
  
  constructor(private service : ConnectService,public router: Router) {
      this.email = localStorage.getItem('email');
      this.f_name = localStorage.getItem('f_name');
      this.user_id = localStorage.getItem('_id');
      this.l_name = localStorage.getItem('l_name');

      

   }

  ngOnInit() {
    this.getAll();
  }

  getAll(){
    this.service.getToDo(this.user_id).subscribe(result=>{
      
      if(result.success){
        console.log(result)
        this.all_to_do = result.data[0]['list'];
      }else{
        this.errmsg = result.err;
        this.errdb = true;
      }
    })
  }

  addToDo(){
    this.service.addToDo({name:this.name},this.user_id).subscribe(result=>{
      
      if(result.success){
        this.name='';
        console.log(result);
        this.getAll();
      }else{
        this.errmsg = result.err;
        this.errdb = true;
      }

    })
  }
  delete(_id){
    this.service.deleteToDo(_id).subscribe(result=>{
      
      console.log(result);
      if(result.success){
        this.getAll();

      }else{
        this.errmsg = result.err;
        this.errdb = true;
      }
    })
  }
}
