import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-login',
  imports: [MaterialModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string;
  password: string;

  constructor(
    private loginService : LoginService,
    private router: Router
  ){}

  login(){
    this.loginService.login(this.username, this.password).subscribe(data => {
      //console.log(data);
      sessionStorage.setItem(environment.TOKEN_NAME, data.access_token);

      this.router.navigate(['/pages/dashboard']);
    });
  }

}
