import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MailingGroupService } from '../../../../service/mailing-group.service';
import { MailingGroup } from '../../../model/mailingGroup';
import { switchMap } from 'rxjs';
import { RecipientsService } from '../../../../service/recipients.service';
import { Recipients } from '../../../model/recipients';


@Component({
  selector: 'app-mailing-group-edit',
  imports: [MaterialModule, ReactiveFormsModule, RouterLink],
  templateUrl: './mailing-group-edit.component.html',
  styleUrl: './mailing-group-edit.component.css'
})
export class MailingGroupEditComponent implements OnInit {

  form: FormGroup;
  id: number;
  isEdit: boolean;
  invalid: any;

  recipients: Recipients[] = [];
  destinataries: number[] = [];
  objDestinataries: Recipients[] =[];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mailingGroupService: MailingGroupService,
    private recipientsService: RecipientsService

  ) { }
  ngOnInit(): void {
    this.form = new FormGroup({
      idMailingGroup: new FormControl(0),
      nameGroup: new FormControl('', [Validators.required, Validators.minLength(3)]),
      recipientIds: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required, Validators.minLength(3)]),
      status: new FormControl(1)
    });

    this.loadInitialData();

    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.isEdit = data['id']!= null;
      this.initForm();
    })
  }

  loadInitialData() {
    this.recipientsService.findAll().subscribe(data =>
      this.recipients = data);
  }

  initForm() {
    if (this.isEdit) {
      this.mailingGroupService.findById(this.id).subscribe(data => {
        this.objDestinataries = this.convertToObject(data.recipientIds);
        console.log(this.objDestinataries);
        this.form = new FormGroup({
          idMailingGroup: new FormControl(data.id),
          nameGroup: new FormControl(data.nameGroup, [Validators.required, Validators.minLength(3)]),
          recipientIds: new FormControl('', [Validators.required]),
          description: new FormControl(data.description, [Validators.required, Validators.minLength(3)]),
          status: new FormControl(data.status)
        });
      });
    }
  }

  convertToObject(ids: number[]): Recipients[] {
    return this.recipients.filter(recipient => ids.includes(recipient.id));
  }

  convertToIds(objects: Recipients[]): number[] {
    return objects.map(object => object.id);
  }

  operate(){
    if(this.invalid){return;}
    const mailingGroup: MailingGroup = new MailingGroup();

    mailingGroup.id = this.form.value['idMailingGroup'];
    mailingGroup.nameGroup = this.form.value['nameGroup'];
    mailingGroup.recipientIds = this.convertToIds(this.objDestinataries);
    mailingGroup.description = this.form.value['description'];
    mailingGroup.status = this.form.value['status'];

      if(this.isEdit){
        this.mailingGroupService.update(this.id, mailingGroup)
        .pipe(switchMap(()=> this.mailingGroupService.findAll())
      )
        .subscribe(data => {
          this.mailingGroupService.setMailingGroupChange(data);
          this.mailingGroupService.setMessageChange('UPDATE!');
        });
      }else{
        this.mailingGroupService.save(mailingGroup)
        .pipe(switchMap(()=> this.mailingGroupService.findAll())
      )
        .subscribe(data => {
          this.mailingGroupService.setMailingGroupChange(data);
          this.mailingGroupService.setMessageChange('CREATE!');
        });

      }
      this.router.navigate(['/pages/mailingGroup']);
  }

  get f(){
    return this.form.controls;
  }

  addRecipient() {

    const selectedRecipient: Recipients = this.form.value.recipientIds;
    const recipientId = selectedRecipient?.id;

    this.objDestinataries.push(selectedRecipient);
    this.destinataries.push(recipientId);

  }

  removeContact(index: number){
    this.objDestinataries.splice(index,1);
  }

}
