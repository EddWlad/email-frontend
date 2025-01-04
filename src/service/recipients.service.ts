import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Recipients } from '../app/model/recipients';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RecipientsService extends GenericService<Recipients> {

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/api/recipients`);
  }
}
