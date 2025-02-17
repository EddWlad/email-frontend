import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Recipients } from '../../model/recipients';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecipientsService } from '../../../service/recipients.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-recipients',
  standalone: true,
  imports: [MaterialModule, RouterLink, RouterOutlet],
  templateUrl: './recipients.component.html',
  styleUrl: './recipients.component.css'
})
export class RecipientsComponent implements OnInit {

  dataSource: MatTableDataSource<Recipients>;
  displayedColumns: string[] = ['id', 'name', 'lastName', 'phone', 'email', 'status', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  totalElements: number = 0;

  constructor(
    private recipientsService: RecipientsService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.recipientsService.listPageable(0, 2).subscribe(data => {
      this.createTable(data.content);
      this.totalElements = data.totalElements;
    });
    this.recipientsService.getRecipientsChange().subscribe(data => this.createTable(data));
    //this.recipientsService.findAll().subscribe(data => this.createTable(data));
    this.recipientsService.getMessageChange().subscribe(data => this._snackBar.open(data, 'INFO', {duration: 2000}))
  }

  applyFilter(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }

  delete(idRecipients: number){
    this.recipientsService.delete(idRecipients)
    .pipe(switchMap(() => this.recipientsService.findAll()))
    .subscribe(data => {
      this.recipientsService.setRecipientsChange(data);
      this.recipientsService.setMessageChange('DELETED!');
    });
  }

  createTable(data: Recipients[]){
    this.dataSource = new MatTableDataSource(data);
    //this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  checkChildren(): boolean{
    return this.route.children.length > 0;
  }


  showMore(e: any){
    this.recipientsService.listPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.createTable(data.content);
      this.totalElements = data.totalElements;
    });
  }

}
