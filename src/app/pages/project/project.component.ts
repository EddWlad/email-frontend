import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from '../../../service/project.service';
import { Project } from '../../model/project';
import { MaterialModule } from '../../material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [MaterialModule, RouterLink, RouterOutlet],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {

  //projects: Project[];
  dataSource: MatTableDataSource<Project>;
  displayedColumns: string[] = ['id', 'name', 'company', 'description', 'status', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private projectService: ProjectService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.projectService.findAll().subscribe(data => {
      this.createTable(data);
    });

    this.projectService.getProjectChange().subscribe(data => {
      this.createTable(data);
    });

    this.projectService.getMessageChange().subscribe(data => {
      this._snackBar.open(data, 'INFO', {duration: 2000, verticalPosition: 'top', horizontalPosition: 'center'});
    });

  }

  delete(idProject: number){
    this.projectService.delete(idProject)
    .pipe(switchMap(() => this.projectService.findAll() ))
    .subscribe(data => {
      this.projectService.setProjectChange(data);
      this.projectService.setMessageChange('DELETED!');
    });
  }

  createTable(data: Project[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }

}
