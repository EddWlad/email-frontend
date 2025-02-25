import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenericService <T>{

  constructor(
    protected http: HttpClient,
    @Inject('url') protected  url: string
  ) { }

  findAll(){
      return this.http.get<T[]>(`${this.url}/findAll`);
    }

    findById(id: number){
      return this.http.get<T>(`${this.url}/find/${id}`);
    }

    save(t: T){
      return this.http.post(`${this.url}/save`, t);
    }

    update(id: number, t: T){
      return this.http.put(`${this.url}/update/${id}`, t);
    }

    delete(id: number){
      return this.http.delete(`${this.url}/delete/${id}`);
    }

}
