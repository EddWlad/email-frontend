import { Injectable } from '@angular/core';
import { PaymentAgreement } from '../app/model/paymentAgreement';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { environment } from '../environments/environment.development';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends GenericService<PaymentAgreement>{

    private paymentChange: Subject<PaymentAgreement[]> = new Subject<PaymentAgreement[]>();
    private messageChange: Subject<string> = new Subject<string>();


  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/api/paymentAgreement`);
   }

     setPaymentChange(data: PaymentAgreement[]){
       this.paymentChange.next(data);
     }

     getPaymentChange(){
       return this.paymentChange.asObservable();
     }

     setMessageChange(data: string){
       this.messageChange.next(data);
     }

     getMessageChange(){
       return this.messageChange.asObservable();
     }
}
