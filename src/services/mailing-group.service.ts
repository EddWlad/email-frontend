import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { MailingGroup } from '../app/model/mailingGroup';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailingGroupService extends GenericService<MailingGroup>{

  private mailingGroupChange: Subject<MailingGroup[]> = new Subject<MailingGroup[]>();
  private messageChange: Subject<string> = new Subject<string>();

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/api/mailingGroup`)
  }

  setMailingGroupChange(data: MailingGroup[]){
    this.mailingGroupChange.next(data);
  }

  getMailingGroupChange(){
    return this.mailingGroupChange.asObservable();
  }

  setMessageChange(data: string){
    this.messageChange.next(data);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }

}
