import { Routes } from "@angular/router";

import { ProjectComponent } from "./project/project.component";
import { SupplierComponent } from "./supplier/supplier.component";
import { ProjectEditComponent } from "./project/project-edit/project-edit.component";
import { PaymentComponent } from "./payment/payment.component";
import { RecipientsComponent } from "./recipients/recipients.component";
import { PaymentEditComponent } from "./payment/payment-edit/payment-edit.component";
import { RecipientsEditComponent } from "./recipients/recipients-edit/recipients-edit.component";
import { MailingGroupComponent } from "./mailing-group/mailing-group.component";
import { MailingGroupEditComponent } from "./mailing-group/mailing-group-edit/mailing-group-edit.component";
import { MailComponent } from "./mail/mail.component";
import { SearchComponent } from "./search/search.component";
import { ReportComponent } from "./report/report.component";

export const pagesRoutes: Routes = [
  {
    path: 'project',
    component: ProjectComponent,
    children: [
      { path: 'new', component: ProjectEditComponent },
      { path: 'edit/:id', component: ProjectEditComponent }
    ],
  },

  {path: 'supplier', component: SupplierComponent},
  {path: 'mail', component: MailComponent},
  {path: 'report', component: ReportComponent},
  {path: 'search', component: SearchComponent},

  {
    path: 'payment',
    component: PaymentComponent,
    children:[
      {path: 'new', component: PaymentEditComponent},
      {path: 'edit/:id', component: PaymentEditComponent},
    ],
  },

  {
    path: 'recipients',
    component: RecipientsComponent,
    children:[
      {path: 'new', component: RecipientsEditComponent},
      {path: 'edit/:id', component: RecipientsEditComponent},
    ]
  },

  {path: 'mailingGroup',
    component: MailingGroupComponent,
    children:[
      {path: 'new', component: MailingGroupEditComponent},
      {path: 'edit/:id', component: MailingGroupEditComponent},
    ]
  },
];
