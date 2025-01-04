import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PaymentService } from '../../../../service/payment.service';
import { PaymentAgreement } from '../../../model/paymentAgreement';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-payment-edit',
  imports: [MaterialModule, ReactiveFormsModule, RouterLink],
  templateUrl: './payment-edit.component.html',
  styleUrl: './payment-edit.component.css'
})
export class PaymentEditComponent implements OnInit {
  form: FormGroup;
  id: number;
  isEdit: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private routeParam: ActivatedRoute,
    private paymentService: PaymentService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      idPayment: new FormControl(0),
      name: new FormControl(''),
      description: new FormControl(''),
      status: new FormControl('')
    });

    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.isEdit = data['id'] != null;
      this.initForm();
    })
  }

  initForm() {
    if (this.isEdit) {
      this.paymentService.findById(this.id).subscribe(data => {
        this.form = new FormGroup({
          idPayment: new FormControl(data.idPayment),
          name: new FormControl(data.name),
          description: new FormControl(data.description),
          status: new FormControl(data.status)
        });
      });
    }
  }
  operate() {
    const payment = new PaymentAgreement();
    payment.idPayment = this.form.value['idPayment'];
    payment.name = this.form.value['name'];
    payment.description = this.form.value['description'];
    payment.status = this.form.value['status'];

        if(this.isEdit){
          this.paymentService.update(this.id, payment)
          .pipe(switchMap(()=> this.paymentService.findAll())
        )
          .subscribe(data => {
            this.paymentService.setPaymentChange(data);
            this.paymentService.setMessageChange('UPDATED!');
          });
        }else{
          this.paymentService.save(payment)
          .pipe(switchMap(()=> this.paymentService.findAll())
        )
          .subscribe(data => {
            this.paymentService.setPaymentChange(data);
            this.paymentService.setMessageChange('CREATED!');
          });
        }
        this.router.navigate(['/pages/payment']);
  }

}
