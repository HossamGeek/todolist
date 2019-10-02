import { Component, OnInit } from '@angular/core';
import { ConnectService } from '../../services/connect.service';
import {Router} from '@angular/router';

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
  constructor(private service : ConnectService,public router: Router) { }


  ngOnInit() {
    localStorage.clear()

  }

  register(){
    this.service.register({email:this.email,password:this.password
      ,f_name:this.f_name,l_name:this.l_name}).subscribe(result=>{
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
