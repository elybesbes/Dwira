import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  type : string = "password";
  isText : boolean = false;
  eyeIcon: string = "fa-eye-slash"
  loginForm! : FormGroup; 
  constructor(private router : Router, private fb: FormBuilder, private authService: AuthService) {
  }

  HideShow(){
    this.isText =! this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text": this.type = "password";
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email : ['', Validators.required],
      password : ['', Validators.required]
    })
  }

  OnLogin(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value)
      this.authService.login(this.loginForm.value)
      .subscribe({
        next:(res)=>{
          console.log(res.token)
          alert("Login Successfull")
          this.loginForm.reset()
          this.router.navigate(['/profile'])
          this.authService.storeToken(res.token)
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })
    }
    else{
      this.validateAllFormFields(this.loginForm)
      alert("Your Form Is Invalid")
    }
  }

  private validateAllFormFields(formgroup: FormGroup){
    Object.keys(formgroup.controls).forEach(field=>{
      const control = formgroup.get(field)
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true})
      }
      else if(control instanceof FormGroup){
        this.validateAllFormFields(control)
      }
    })
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

}


