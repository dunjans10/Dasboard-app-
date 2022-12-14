import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUiService } from 'src/app/auth/shared/services/auth-ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;
  date:Date = new Date();
  error:string = '';
 
  constructor(private fb:FormBuilder, private router:Router, private authService:AuthUiService) { 
 
  }

  ngOnInit(): void {
    this.createForm(); 
  }

  createForm (){
    this.loginForm = this.fb.group({
      username:['', Validators.required],
      password:['', Validators.required]
    })
  }


  submitForm(){

    const val = this.loginForm.value;
    //console.log(val)
    if(this.loginForm.invalid){
      return;
    }
  
    if(val){
      this.authService.login(val).subscribe({
          next: () => {
          console.log('User is logged in')
          this.router.navigate(['/apps'])
        
          },
          error:(err) => this.error = err,
        
        })

      
    }
  }

  /*cancel(){
    this.router.navigate(['/'])
  }*/
  

}