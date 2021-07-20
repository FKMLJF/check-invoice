import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import {Router} from "@angular/router"
import {AppComponent} from "../app.component";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  disabled="";
  rememberMe = false;
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,private router: Router, private app: AppComponent) { }

  ngOnInit(): void {
  let ls = localStorage.getItem('remember');
    if(ls != null){
      let user = JSON.parse(ls);
      this.form.username = user.username;
      this.form.password = user.password;
      this.rememberMe = true;
    }

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;
  this.disabled = "disabled";
    this.authService.login(username, password).subscribe(
      data => {

        this.tokenStorage.saveToken(data.jwt);
        this.tokenStorage.saveUser(JSON.stringify(data.user));

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.app.check();
        this.disabled = "";
        this.router.navigate(['/dashboard'])
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.disabled = "";

      }
    );
  }

  onClickRememberMe(rememberMe: boolean) : void {
    if(rememberMe){
      localStorage.setItem('remember', JSON.stringify({username: this.form.username, password: this.form.password}))
    }else{
      localStorage.removeItem('remember');
    }
  }

}
