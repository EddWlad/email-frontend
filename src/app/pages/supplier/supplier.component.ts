import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { Supplier } from '../../model/supplier';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SupplierService } from '../../../services/supplier.service';
import { MatDialog } from '@angular/material/dialog';
import { SupplierDialogComponent } from './supplier-dialog/supplier-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-supplier',
  imports: [MaterialModule],
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.css'
})
export class SupplierComponent implements OnInit {

  dataSource: MatTableDataSource<Supplier>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'name', 'email', 'ruc', 'status', 'actions'];

  constructor(
    private supplierService: SupplierService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.supplierService.findAll().subscribe(data => this.createTable(data));
    this.supplierService.getSupplierChange().subscribe(data => this.createTable(data));
    this.supplierService.getMessageChange().subscribe(data => this._snackBar.open(data, 'INFO', {duration:2000}));
  }
  createTable(data: Supplier[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }

  openDialog(supplier?: Supplier) {
    this._dialog.open(SupplierDialogComponent,{
      width: '350px',
      data: supplier,
      disableClose: false
    })
  }

  delete(idSupplier: number) {
        this.supplierService.delete(idSupplier)
        .pipe(switchMap(() => this.supplierService.findAll() ))
        .subscribe(data => {
          this.supplierService.setSupplierChange(data);
          this.supplierService.setMessageChange('DELETED!');
        });
  }
}
