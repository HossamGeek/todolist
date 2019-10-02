import { Component, OnInit } from '@angular/core';
import { ConnectService } from '../../services/connect.service';
import {Router} from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

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

  todo_id = '';
  all_to_do = [];
  edit = false;
  constructor(private service : ConnectService,public router: Router,private toastr: ToastrManager) {
      if(!localStorage.getItem('email')){
        this.toastr.errorToastr("permission denied ", 'OPPS! 😒');

        this.router.navigate(['/home']);

      }else{
        this.email = localStorage.getItem('email');
        this.f_name = localStorage.getItem('f_name');
        this.user_id = localStorage.getItem('_id');
        this.l_name = localStorage.getItem('l_name');
  
      }

      

   }

  ngOnInit() {
    this.getAll();
  }

  showEdit(name,id){
      this.edit = true;
      this.todo_id = id;
      this.name = name;
  }

  cancel(){
    this.edit = false;
      this.todo_id = '';
      this.name = '';
  }


  editToDo(){
    this.service.editToDo(this.user_id,this.todo_id,{name:this.name}).subscribe(result=>{
      
      console.log(result);
      if(result.success){
        
        this.getAll();
        this.toastr.infoToastr('Updated 😉', 'success');
        this.cancel();
      }else{
        this.toastr.errorToastr(result.err, 'OPPS! 😭');
         
      }
    })
  }
  getAll(){
    this.service.getToDo(this.user_id).subscribe(result=>{
      
      if(result.success){
        if(result.data.length)
          {
            let list = result.data[0]['list']
            if(list || list.length)
              this.all_to_do =list;
          }
        else    this.all_to_do =[];
      }else{
        this.toastr.errorToastr(result.err, 'OPPS! 😭');
      }
    })
  }

  addToDo(){
    if(!this.name){
      this.toastr.errorToastr('Please Write New ToDo', 'OPPS! 😭');
    }else{
      this.service.addToDo({name:this.name},this.user_id).subscribe(result=>{
      
        console.log(result)
        if(result.success){
          this.toastr.successToastr('Added to list 😄', 'success');
          this.name='';
          console.log(result);
          this.getAll();
        }else{
          this.toastr.errorToastr(result.err, 'OPPS! 😭');
         
        }
  
      })
    }
    
  }
  delete(_id){
    this.service.deleteToDo(_id).subscribe(result=>{
      
      console.log(result);
      if(result.success){
        
        this.getAll();
        this.toastr.infoToastr('Deleted 😉', 'success');
      }else{
        this.toastr.errorToastr(result.err, 'OPPS! 😭');
         
      }
    })
  }
}
