import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Mail } from '../app/model/mail';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MailService extends GenericService<Mail>{

  private mailChange: Subject<Mail[]> = new Subject<Mail[]>();
  private messageChange: Subject<string> = new Subject<string>();


  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/api/mail`)
  }



  setMailChange(data: Mail[]){
    this.mailChange.next(data);
  }

  getMailChange(){
    return this.mailChange.asObservable();
  }
  setMessageChange(data: string){
    this.messageChange.next(data);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }

  sendMail(userId: number, mail: Mail){
    return this.http.post(`${this.url}/sendMessage/${userId}`, mail);
  }


}
