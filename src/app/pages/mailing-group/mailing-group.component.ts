import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { ActivatedRoute, RouterEvent, RouterLink, RouterOutlet } from '@angular/router';
import { MailingGroup } from '../../model/mailingGroup';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MailingGroupService } from '../../../services/mailing-group.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-mailing-group',
  standalone: true,
  imports: [MaterialModule, RouterLink, RouterOutlet],
  templateUrl: './mailing-group.component.html',
  styleUrl: './mailing-group.component.css'
})
export class MailingGroupComponent implements OnInit  {

  dataSource: MatTableDataSource<MailingGroup>;
  displayedColumns: string[] = ['id', 'name', 'members', 'description', 'status', 'actions'];

      @ViewChild(MatPaginator) paginator: MatPaginator;
      @ViewChild(MatSort) sort: MatSort;

  constructor(
    private mailingGroupService: MailingGroupService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ){}


  ngOnInit(): void {
    this.mailingGroupService.getMailingGroupChange().subscribe(data => this.createTable(data));
    this.mailingGroupService.findAll().subscribe(data => this.createTable(data));
    this.mailingGroupService.getMessageChange().subscribe(data => this._snackBar.open(data, 'INFO', {duration: 2000}));
  }

  applyFilter(e: any){
    this.dataSource.filter = e.target.value.trim();
  }

  delete(idMailingGroup: number){
    this.mailingGroupService.delete(idMailingGroup)
    .pipe(switchMap(() => this.mailingGroupService.findAll()))
    .subscribe(data => {
      this.mailingGroupService.setMailingGroupChange(data);
      this.mailingGroupService.setMessageChange('DELETED!');
    })
  }

  createTable(data: MailingGroup[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  checkChildren(): boolean{
    return this.route.children.length > 0;
  }


}
