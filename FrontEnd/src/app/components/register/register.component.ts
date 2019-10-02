import { Component, OnInit } from '@angular/core';
import { ConnectService } from '../../services/connect.service';
import {Router} from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errdb = false;
  errmsg= '';
  successdb = false;
  email:any;
  password:any;
  f_name:any;
  l_name:any;
  constructor(private service : ConnectService,public router: Router,private toastr: ToastrManager) { }


  ngOnInit() {
    localStorage.clear()

  }

  register(){
     if(!this.f_name.length){
      this.toastr.errorToastr('Firstname is required', 'OPPS! 😭');
    } else if(!this.l_name.length){
      this.toastr.errorToastr('Lastname is required', 'OPPS! 😭');
    }
    else if(!this.email.length ){
      this.toastr.errorToastr('Email is required', 'OPPS! 😭');
    }
    else if(!this.password.length){
      this.toastr.errorToastr('Password is required', 'OPPS! 😭');
    }else{
    this.service.register({email:this.email,password:this.password
      ,f_name:this.f_name,l_name:this.l_name}).subscribe(result=>{
     if(result.success){
      this.toastr.successToastr("Register is success 👏", 'Done ');
       localStorage.setItem('_id',result.data._id)
       localStorage.setItem('email',result.data.email)
       localStorage.setItem('f_name',result.data.f_name)
       localStorage.setItem('l_name',result.data.l_name)
       this.router.navigate(['/todolist']);
     }else{
      this.toastr.errorToastr(result.err, 'OPPS! 😭');
     }
    })}
  }
}
