import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Recipients } from '../app/model/recipients';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipientsService extends GenericService<Recipients> {

      private recipientsChange: Subject<Recipients[]> = new Subject<Recipients[]>();
      private messageChange: Subject<string> = new Subject<string>();

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/api/recipients`);
  }

       setRecipientsChange(data: Recipients[]){
         this.recipientsChange.next(data);
       }

       getRecipientsChange(){
         return this.recipientsChange.asObservable();
       }

       setMessageChange(data: string){
         this.messageChange.next(data);
       }

       getMessageChange(){
         return this.messageChange.asObservable();
       }
}
