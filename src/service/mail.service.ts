import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Mail } from '../app/model/mail';
import { Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { FilterMailDTO } from '../app/model/filterMailDTO';
import { MailingGroupService } from './mailing-group.service';

@Injectable({
  providedIn: 'root'
})
export class MailService extends GenericService<Mail> {

  private mailChange: Subject<Mail[]> = new Subject<Mail[]>();
  private messageChange: Subject<string> = new Subject<string>();

  private mailGroupService:MailingGroupService;


  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/api/mail`)
  }

  uploadAttachments(mailId: number, formData: FormData) {
    return this.http.post(`${environment.HOST}/api/attachment/upload/${mailId}`, formData);
  }

  searchOthers(dto: FilterMailDTO){
    return this.http.post<Mail[]>(`${environment.HOST}/api/mail/search/others`, dto);
  }

  searchByDates(date1: string, date2: string){
    const params = new HttpParams()
      .set('date1', date1)
      .set('date2', date2);

    return this.http.get<Mail[]>(`${environment.HOST}/api/mail/search/dates`, { params });
  }

  setMailChange(data: Mail[]) {
    this.mailChange.next(data);
  }

  getMailChange() {
    return this.mailChange.asObservable();
  }
  setMessageChange(data: string) {
    this.messageChange.next(data);
  }

  getMessageChange() {
    return this.messageChange.asObservable();
  }

  sendMail(userId: number, mail: Mail) {
    return this.http.post(`${this.url}/sendMessage/${userId}`, mail);
  }

  getDestinataries(idMailingGroup: number){
    return this.http.get<any>(`${environment.HOST}/api/mailingGroup/find/${idMailingGroup}`);
  }

  callProcedureOrFunction(){
    return this.http.get<any>(`${environment.HOST}/api/mail/callProcedureNative`);
  }

}
