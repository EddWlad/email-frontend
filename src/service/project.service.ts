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
