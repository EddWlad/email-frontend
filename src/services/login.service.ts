import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

interface ILoginRequest{
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = `${environment.HOST}/login`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(username: string, password: string){
    const body: ILoginRequest = {username, password};
    return this.http.post<any>(this.url, body);
  }

  isLogged(){
    return sessionStorage.getItem(environment.TOKEN_NAME) != null;
  }
  logout(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  //sendMail from backend
  sendMail(username: string){
    return this.http.post<number>(`${environment.HOST}/email/sendMail`, username,
      { headers: new HttpHeaders().set('Content-Type', 'text/plain') }
    );
  }

  checkRandomReset(random: string){
    return this.http.get<number>(`${environment.HOST}/email/reset/check/${random}`);
  }

  reset(random: string, newPassWord: string){
    return this.http.post<number>(
      `${environment.HOST}/email/reset/${random}`, newPassWord,
      { headers: new HttpHeaders().set('Content-Type', 'text/plain') }
    );
  }

}
