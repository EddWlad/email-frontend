import { Component, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { Mail } from '../../../model/mail';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MailService } from '../../../../service/mail.service';
import { MailingGroup } from '../../../model/mailingGroup';

@Component({
  selector: 'app-search-dialog',
  imports: [MaterialModule, DatePipe],
  templateUrl: './search-dialog.component.html',
  styleUrl: './search-dialog.component.css'
})
export class SearchDialogComponent implements OnInit{

  mail: Mail = new Mail();
  destinatary: MailingGroup = new MailingGroup();

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Mail,
    private mailService: MailService
  ){

  }
  ngOnInit(): void {
    this.mail = {... this.data}
    this.mailService.getDestinataries(this.mail.mailingGroup.id).subscribe(data => this.destinatary = data);
    console.log(this.mail.mailingGroup.id);
  }


}
