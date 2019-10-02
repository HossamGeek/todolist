import { Component, OnInit } from '@angular/core';
import { ConnectService } from '../../services/connect.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errdb = false;
  errmsg= '';
  successdb = false;
  email:any;
  password:any;
  constructor(private service : ConnectService,public router: Router) { }

  ngOnInit() {
    localStorage.clear()

  }

  login(){
    this.service.login({email:this.email,password:this.password}).subscribe(result=>{
     if(result.success){
       localStorage.setItem('_id',result.data._id)
       localStorage.setItem('email',result.data.email)
       localStorage.setItem('f_name',result.data.f_name)
       localStorage.setItem('l_name',result.data.l_name)
       this.router.navigate(['/todolist']);
     }else{
      this.errdb = true; 
      this.errmsg=result.err
     }
    })
  }
}
