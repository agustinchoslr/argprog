import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtDTO } from '../jwt-dto';
import { LoginUsuario } from '../login-usuario';
import { NuevoUsuario } from '../nuevo-usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = environment.apiAuthUrl;

  constructor(private httpClient: HttpClient) { }

public nuevo(nuevoUsuario: NuevoUsuario):Observable<any> {
  return this.httpClient.post<any>(this.authURL + 'nuevo', nuevoUsuario);
}

public login(loginUsuario: LoginUsuario):Observable<JwtDTO> {
  return this.httpClient.post<JwtDTO>(this.authURL + 'login', loginUsuario);
}

}
