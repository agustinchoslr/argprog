import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUsuario } from '../login-usuario';
import { AuthService } from '../servicios/auth.service';
import { TokenService } from '../servicios/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  islogged = false;
  isLoginFail = false;
  nombreUsuario!: string;
  password!: string;
  roles: string[] = [];
  errMsj!: string;
  loginUsuario!: LoginUsuario;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {}

  home(){
    this.router.navigate([''])
  }

  ngOnInit() {
    if(this.tokenService.getToken()){
      this.islogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    this.authService.login(this.loginUsuario).subscribe({
      next: (data) => {
        this.islogged = true;
        this.isLoginFail = false;

        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.islogged = false;
        this.isLoginFail = true;
        console.log(err);
        this.errMsj = err.error.message;
        console.log(err.error.message);
      }
    })
  }

}