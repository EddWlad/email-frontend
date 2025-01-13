import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MaterialModule } from '../../../material/material.module';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecipientsService } from '../../../../service/recipients.service';
import { Recipients } from '../../../model/recipients';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-recipients-edit',
  imports: [MaterialModule, ReactiveFormsModule, RouterLink],
  templateUrl: './recipients-edit.component.html',
  styleUrl: './recipients-edit.component.css'
})
export class RecipientsEditComponent implements OnInit {
    form: FormGroup;
    id: number;
    isEdit: boolean;
    invalid: any;

      constructor(
        private route: ActivatedRoute,
        private router: Router,
        private recipientsService: RecipientsService
      ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      idRecipients: new FormControl(0),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.minLength(3)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(3)]),
      status: new FormControl('')
    });

    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.isEdit = data['id']!= null;
      this.initForm();
    })
  }

  initForm() {
    if(this.isEdit) {
      this.recipientsService.findById(this.id).subscribe(data => {
        this.form = new FormGroup({
          idRecipients: new FormControl(data.id),
          name: new FormControl(data.name, [Validators.required, Validators.minLength(3)]),
          lastName: new FormControl(data.lastName, [Validators.required, Validators.minLength(3)]),
          email: new FormControl(data.email, [Validators.required, Validators.minLength(3)]),
          phone: new FormControl(data.phone, [Validators.required, Validators.minLength(3)]),
          status: new FormControl(data.status)
        });
      });
    }
  }

  operate() {
    if (this.invalid) {return;}
    const recipients: Recipients = new Recipients();

    recipients.id = this.form.value['idRecipients'];
    recipients.name = this.form.value['name'];
    recipients.lastName = this.form.value['lastName'];
    recipients.phone = this.form.value['phone'];
    recipients.email = this. form.value['email'];
    recipients.status = this.form.value['status'];

    if(this.isEdit){
      this.recipientsService.update(this.id, recipients)
      .pipe(switchMap(() => this.recipientsService.findAll())
    )
      .subscribe(data => {
        this.recipientsService.setRecipientsChange(data);
        this.recipientsService.setMessageChange('UPDATE!');
      });
    }else{
      this.recipientsService.save(recipients)
      .pipe(switchMap(()=> this.recipientsService.findAll())
    )
      .subscribe(data => {
        this.recipientsService.setRecipientsChange(data);
        this.recipientsService.setMessageChange('CREATE!');
      });
    }
    this.router.navigate(['/pages/recipients']);
  }

  get f(){
    return this.form.controls;
  }

}
