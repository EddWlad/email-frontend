import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Supplier } from '../app/model/supplier';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupplierService extends GenericService<Supplier>{

    private projectChange: Subject<Supplier[]> = new Subject<Supplier[]>();
    private messageChange: Subject<string> = new Subject<string>();

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/api/supplier`);
  }

    setSupplierChange(data: Supplier[]){
      this.projectChange.next(data);
    }

    getSupplierChange(){
      return this.projectChange.asObservable();
    }

    setMessageChange(data: string){
      this.messageChange.next(data);
    }

    getMessageChange(){
      return this.messageChange.asObservable();
    }
}
