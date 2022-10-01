import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoginPageForm } from './login.form';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;

  email: string;
  password: string;

  constructor(
    private router: Router,
    private formBuilder : FormBuilder,
    private auth: AuthService,
    private toastr: ToastController
    ) { }

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();
  }

  async toast(message, status){
    const toast = await this.toastr.create({
      message: message,
      color: status,
      position: 'top',
      duration: 3000
    });
    toast.present();
  }

  login(){
    if(this.email && this.password){
      this.auth.signIn(this.email, this.password);
    }else{
      this.toast ('Please enter your email and password!', 'warning');
    }
  }

  registerB(){
    this.router.navigate(['/register']);
  }
 

// show password
  showPassword = false;
  passwordToggleIcon ='eye';
  togglePassword():void{
    this.showPassword = !this.showPassword;

    if(this.passwordToggleIcon = 'eye') {
      this.passwordToggleIcon = 'eye-off';
     }
      else{
      this.passwordToggleIcon = 'eye';
    }
  }

}

