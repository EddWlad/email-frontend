import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MailingGroup } from '../../model/mailingGroup';
import { Supplier } from '../../model/supplier';
import { Project } from '../../model/project';
import { PaymentAgreement } from '../../model/paymentAgreement';
import { MailingGroupService } from '../../../service/mailing-group.service';
import { SupplierService } from '../../../service/supplier.service';
import { ProjectService } from '../../../service/project.service';
import { PaymentService } from '../../../service/payment.service';
import { Recipients } from '../../model/recipients';
import { RecipientsService } from '../../../service/recipients.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatStepper } from '@angular/material/stepper';
import { Mail } from '../../model/mail';
import { format } from 'date-fns';
import { MailService } from '../../../service/mail.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-mail',
  imports: [MaterialModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './mail.component.html',
  styleUrl: './mail.component.css'
})


export class MailComponent implements OnInit{

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  recipients: Recipients[] = [];
  destinataries: number[] = [];
  objDestinataries: Recipients[] =[];

  uploadedFiles: File[] = [];
  mailId: number;

  mailingGroup: MailingGroup[] = [];
  supplier: Supplier[] = [];
  project: Project[] = [];
  paymentAgreement$: Observable<PaymentAgreement[]>;

  minDate: Date = new Date();

  saved: boolean = false;

  mailSaved: Mail;

  private _snackBar: MatSnackBar;

  @ViewChild('stepper') stepper: MatStepper;

  constructor(
    private formBuilder: FormBuilder,
    private mailingGroupService: MailingGroupService,
    private supplierService: SupplierService,
    private projectService: ProjectService,
    private paymentAgreementService: PaymentService,
    private recipientsService: RecipientsService,
    private mailService: MailService
  ){}

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      idRecipients: this.convertToIds(this.objDestinataries),
      mailingGroup: [new FormControl(), Validators.required],
      bill: new FormControl('', Validators.required),
      priority: new FormControl('', Validators.required),
      supplier: [new FormControl(), Validators.required],
      project: [new FormControl(), Validators.required],
      paymentAgreement: [new FormControl(), Validators.required],
      attachments: [new FormControl(), Validators.required],
      dateCreate: [new FormControl(new Date()), Validators.required],
      observation: new FormControl('', Validators.required),
      status: new FormControl(1)
    });

    this.secondFormGroup = this.formBuilder.group({

    });


    this.loadInitialData();
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files) {
      for (let i = 0; i < event.dataTransfer.files.length; i++) {
        this.uploadedFiles.push(event.dataTransfer.files[i]);
      }
    }
  }

  loadInitialData(){
    this.mailingGroupService.findAll().subscribe(data => this.mailingGroup = data);
    this.supplierService.findAll().subscribe(data => this.supplier = data);
    this.projectService.findAll().subscribe(data => this.project = data);
    this.paymentAgreement$ = this.paymentAgreementService.findAll();
    this.recipientsService.findAll().subscribe(data =>this.recipients = data);
  }

  convertToObject(ids: number[]): Recipients[] {
    return this.recipients.filter(recipient => ids.includes(recipient.id));
  }

  convertToIds(objects: Recipients[]): number[] {
    return objects.map(object => object.id);
  }

  convertToId(object: Recipients): number {
    return object.id;
  }



  nextManualStep(){
    if(this.saved){
      this.stepper.next();
    }else{

    }
  }

onFileSelected(event: any) {
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    this.uploadedFiles.push(files[i]);
  }
}

removeFile(index: number) {
  this.uploadedFiles.splice(index, 1);
}

uploadFiles() {
  if (this.uploadedFiles.length === 0) {
    console.warn("No hay archivos para subir");
    return;
  }

  if (!this.mailId) {
    console.error("Error: mailId no está definido");
    return;
  }

  const formData = new FormData();
  this.uploadedFiles.forEach(file => {
    formData.append("files", file);
  });

  this.mailService.uploadAttachments(this.mailId, formData).subscribe({
    next: (response) => {
      console.log("Archivos subidos con éxito:", response);

      this.mailService.findById(this.mailId).subscribe(mail => {
        this.mailSaved = mail;
      });

    },
    error: (err) => {
      console.error("Error al subir archivos:", err);
    }
  });

  setTimeout(() => {
    this.mailService.setMessageChange('UPLOADED FILES!');
    this.nextManualStep();
  }, 2000);
}

  save(){
    const mail: Mail = new Mail();

    const selectedRecipient: Recipients = this.firstFormGroup.value.idRecipients;
    const recipientId = this.convertToId(selectedRecipient)

    mail.idRecipients = recipientId;
    mail.mailingGroup = this.firstFormGroup.value['mailingGroup'];
    mail.bill = this.firstFormGroup.value['bill'];
    mail.priority = this.firstFormGroup.value['priority'];
    mail.supplier = this.firstFormGroup.value['supplier']
    mail.project = this.firstFormGroup.value['project'];
    mail.paymentAgreement = this.firstFormGroup.value['paymentAgreement'];
    mail.dateCreate = format(this.firstFormGroup.value['dateCreate'], "yyyy-MM-dd'T'HH:mm:ss");
    mail.observation = this.firstFormGroup.value['observation'];
    mail.status = this.firstFormGroup.value['status'];

    this.mailService.save(mail).subscribe((response: Mail) =>{
      if (response?.id) {
        this.saved = true;
        this.mailId = response.id;
        this.mailSaved = response;
        console.log("Mail guardado con ID:", this.mailId);
      } else {
        console.error("Error: No se recibió un ID del mail guardado");
      }
    }, error => {
      console.error("Error al guardar el mail:", error);
    });



    setTimeout(()=>{
      this.mailService.setMessageChange('CREATE!');
      this.nextManualStep();
    }, 2000);

  }

  cleanControls(){
    this.firstFormGroup.reset();
    this.recipients = [];
    this.destinataries = [];
    this.objDestinataries  =[];

    this.mailingGroup = [];
    this.supplier = [];
    this.project = [];
    //this.paymentAgreement$ = null;
  }

  get f(){
    return this.firstFormGroup.controls;
  }

  getFileName(filePath: string): string {
    return filePath.split('\\').pop()?.split('_').pop()?.split('/').pop() || 'Archivo desconocido';
  }

}
