import { inject, Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Menu } from '../app/model/menu';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService extends GenericService<Menu>{

  private menuChange =  new Subject<Menu[]>();

  constructor(){
    super(
      inject (HttpClient),
      `${environment.HOST}/api/menu`
    );
  }

  getMenusByUser(username: string){
    return this.http.post<Menu[]>(`${environment.HOST}/api/menu/user`, username);
  }

  getMenuChange(){
    return this.menuChange.asObservable();
  }

  setMenuChange(menus: Menu[]){
    this.menuChange.next(menus);
  }

}
