import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MenuService } from '../../../services/menu.service';
import { Menu } from '../../model/menu';
import { LoginService } from '../../../services/login.service';



@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive ,MaterialModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  logout(){
    this.loginService.logout();
  }

  menus: Menu[];

  constructor(
    private menuService: MenuService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.menuService.getMenuChange().subscribe(data => this.menus = data);
    }
  }

