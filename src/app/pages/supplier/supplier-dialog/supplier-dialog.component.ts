import { Component, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { Supplier } from '../../../model/supplier';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SupplierService } from '../../../../service/supplier.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-supplier-dialog',
  standalone: true,
  imports: [MaterialModule, FormsModule],
  templateUrl: './supplier-dialog.component.html',
  styleUrl: './supplier-dialog.component.css'
})
export class SupplierDialogComponent implements OnInit {

  supplier: Supplier;
  form: FormsModule

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Supplier,
    private _dialogRef: MatDialogRef<SupplierDialogComponent>,
    private supplierService: SupplierService) { }


  ngOnInit(): void {
    this.supplier = { ...this.data };
    /*this.supplier.ruc = this.data.ruc
    this.supplier.name = this.data.name
    this.supplier.email = this.data.email
    this.supplier.status = this.data.status*/
  }
  close() {
    this._dialogRef.close();
  }

  operate() {
    console.log(this.supplier.id);
    if (this.supplier != null && this.supplier.id > 0) {
      this.supplierService.update(this.supplier.id, this.supplier)
        .pipe(switchMap(() => this.supplierService.findAll()))
        .subscribe(data => {
          this.supplierService.setSupplierChange(data);
          this.supplierService.setMessageChange('UPDATED!')
        });
    }else{
      this.supplierService.save(this.supplier)
      .pipe(switchMap(() => this.supplierService.findAll()))
      .subscribe(data => {
        this.supplierService.setSupplierChange(data);
        this.supplierService.setMessageChange('CREATED!')
      });
    }
    this.close();
  }
}
