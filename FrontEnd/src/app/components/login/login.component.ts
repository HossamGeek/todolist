import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ConnectService } from '../../services/connect.service';
import {Router} from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errdb = false;
  errmsg= '';
  successdb = false;
  email= '';
  password= '';
  constructor(private service : ConnectService,public router: Router,private toastr: ToastrManager, vcr: ViewContainerRef) {

   }

  ngOnInit() {
    

    localStorage.clear()

  }

  login(){
    if(!this.email.length ){
      this.toastr.errorToastr('Email is required', 'OPPS! 😭');
    }
    else if(!this.password.length){
      this.toastr.errorToastr('Password is required', 'OPPS! 😭');
    }else{
      this.service.login({email:this.email,password:this.password}).subscribe(result=>{
        if(result.success){
          localStorage.setItem('_id',result.data._id)
          localStorage.setItem('email',result.data.email)
          localStorage.setItem('f_name',result.data.f_name)
          localStorage.setItem('l_name',result.data.l_name);
          this.toastr.successToastr("login is success 👏", 'Done ');
          this.router.navigate(['/todolist']);
        }else{
         
         this.toastr.errorToastr(result.err, 'OPPS! 😭');
        }
       })
    }
    
  }
}
