import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { MenuService } from '../../services/menu.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment.development';
import { map } from 'rxjs';
import { Menu } from '../model/menu';

export const certGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) =>{


  const loginService = inject(LoginService);
  const menuService = inject(MenuService);
  const router = inject(Router);

  //1 verificar si el usuario esta logeado
  const result = loginService.isLogged();
  if(!result){
    loginService.logout();
    return false;
  }else{
      //2 verificar si el token esta expirado
    const helper = new JwtHelperService();
    const token = sessionStorage.getItem(environment.TOKEN_NAME);

    if(!helper.isTokenExpired(token)){
        //3 verificar si tienes el rol necesario para acceder a este recuerso
        const url = state.url;
        const username = helper.decodeToken(token).sub;

        return menuService.getMenusByUser(username).pipe(map((data : Menu[]) =>{
          menuService.setMenuChange(data);

          let count = 0;
          for(let m of data){
            if(url.startsWith(m.url)){
              count++;
              break;
            }
          }

          if(count > 0){
            return true;
          }else{
            router.navigate(['/pages/not-403']);
            return false;
          }
        }));
        //return true;
    }else{
      loginService.logout();
      return false;
    }
  }
};
