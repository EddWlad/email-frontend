import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { format } from 'date-fns';
import { FilterMailDTO } from '../../model/filterMailDTO';
import { MailService } from '../../../service/mail.service';
import { MatTableDataSource } from '@angular/material/table';
import { Mail } from '../../model/mail';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DatePipe, LowerCasePipe, UpperCasePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SearchDialogComponent } from './search-dialog/search-dialog.component';

@Component({
  selector: 'app-search',
  imports: [MaterialModule, ReactiveFormsModule, UpperCasePipe, LowerCasePipe, DatePipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  form: FormGroup;
  dataSource: MatTableDataSource<Mail>;

  @ViewChild('tabGroup') tabGroup: MatTabGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['mailingGroup', 'bill', 'priority', 'supplier', 'createDate', 'actions'];

  constructor(
    private mailService: MailService,
    private _dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.form = new FormGroup({
      bill: new FormControl(),
      observation: new FormControl(),
      startDate: new FormControl,
      endDate: new FormControl()
    });
  }


  search(){
    if(this.tabGroup.selectedIndex === 0){
      //Option 1
      const bill = this.form.value['bill'];
      const observation = this.form.value['observation']?.toLowerCase();

      const filterData = new FilterMailDTO(bill, observation);
      this.mailService.searchOthers(filterData).subscribe(data => this.createTable(data));

    }else{
      //option 2
      const date1 = format(this.form.value['startDate'], "yyyy-MM-dd'T'HH:mm:ss");
      const date2 = format(this.form.value['endDate'], "yyyy-MM-dd'T'HH:mm:ss");

      console.log(date1);
      console.log(date2);

      this.mailService.searchByDates(date1, date2).subscribe(data => this.createTable(data));
    }

  }

      createTable(data: Mail[]) {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }

      viewDetails(mail: Mail){
        this._dialog.open(SearchDialogComponent,{
          width: '750px',
          data: mail
        })
      }
}
