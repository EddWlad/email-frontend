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
import { DashboardComponent } from "./dashboard/dashboard.component";
import { certGuard } from "../guard/cert.guard";
import { Not403Component } from "./not403/not403.component";

export const pagesRoutes: Routes = [
  {path: 'dashboard', component: DashboardComponent, canActivate: [certGuard]},
  {
    path: 'project',
    component: ProjectComponent,
    children: [
      { path: 'new', component: ProjectEditComponent },
      { path: 'edit/:id', component: ProjectEditComponent }
    ], canActivate: [certGuard]
  },

  {path: 'supplier', component: SupplierComponent, canActivate: [certGuard]},
  {path: 'mail', component: MailComponent, canActivate: [certGuard]},
  {path: 'report', component: ReportComponent, canActivate: [certGuard]},
  {path: 'search', component: SearchComponent, canActivate: [certGuard]},
  {path: 'not-403', component: Not403Component},


  {
    path: 'payment',
    component: PaymentComponent,
    children:[
      {path: 'new', component: PaymentEditComponent},
      {path: 'edit/:id', component: PaymentEditComponent},
    ], canActivate: [certGuard]
  },

  {
    path: 'recipients',
    component: RecipientsComponent,
    children:[
      {path: 'new', component: RecipientsEditComponent},
      {path: 'edit/:id', component: RecipientsEditComponent},
    ], canActivate: [certGuard]
  },

  {path: 'mailingGroup',
    component: MailingGroupComponent,
    children:[
      {path: 'new', component: MailingGroupEditComponent},
      {path: 'edit/:id', component: MailingGroupEditComponent},
    ], canActivate: [certGuard]
  },
];
