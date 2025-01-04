import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentAgreement } from '../../model/paymentAgreement';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentService } from '../../../service/payment.service';
import { switchMap } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [MaterialModule, RouterLink, RouterOutlet],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {

  dataSource: MatTableDataSource<PaymentAgreement>;
  displayedColumns: string[] = ['id', 'name', 'description', 'status', 'actions'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

  constructor(
    private paymentService: PaymentService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.paymentService.getPaymentChange().subscribe(data => this.createTable(data));
    this.paymentService.findAll().subscribe(data => this.createTable(data));
    this.paymentService.getMessageChange().subscribe(data => this._snackBar.open(data, 'INFO', {duration: 2000}))
  }

  applyFilter(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }

    delete(idPayment: number){
      this.paymentService.delete(idPayment)
      .pipe(switchMap(() => this.paymentService.findAll() ))
      .subscribe(data => {
        this.paymentService.setPaymentChange(data);
        this.paymentService.setMessageChange('DELETED!');
      });
    }

    createTable(data: PaymentAgreement[]) {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    checkChildren(): boolean{
      return this.route.children.length > 0;

    }
}
