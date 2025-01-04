import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Project } from '../app/model/project';
import { Subject } from 'rxjs';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends GenericService<Project> {

  //private url: string = `${environment.HOST}/api/project`;
  private projectChange: Subject<Project[]> = new Subject<Project[]>();
  private messageChange: Subject<string> = new Subject<string>();

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/api/project`);
  }

  /*constructor(private http: HttpClient) { }

  finAll(){
    return this.http.get<Project[]>(`${this.url}/findAll`);
  }

  findById(id: number){
    return this.http.get<Project>(`${this.url}/find/${id}`);
  }

  save(project: Project){
    return this.http.post(`${this.url}/save`, project);
  }

  update(id: number, project: Project){
    return this.http.put(`${this.url}/update/${id}`, project);
  }

  delete(id: number){
    return this.http.delete(`${this.url}/delete/${id}`);
  }*/

  setProjectChange(data: Project[]){
    this.projectChange.next(data);
  }

  getProjectChange(){
    return this.projectChange.asObservable();
  }

  setMessageChange(data: string){
    this.messageChange.next(data);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }
}
