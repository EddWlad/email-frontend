import { Component } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  username: string;

  constructor(private menuService: MenuService){

  }

  ngOnInit() {
    const helper = new JwtHelperService();
    const token = sessionStorage.getItem(environment.TOKEN_NAME);
    const decodedToken = helper.decodeToken(token);

    this.username = decodedToken.sub;
    console.log(this.username); // Imprime el username del usuario logueado

    this.menuService.getMenusByUser(this.username).subscribe(data => {3
      console.log(data);
      this.menuService.setMenuChange(data);
    });
  }
}
