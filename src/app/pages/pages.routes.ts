import { Routes } from "@angular/router";

import { ProjectComponent } from "./project/project.component";
import { SupplierComponent } from "./supplier/supplier.component";
import { ProjectEditComponent } from "./project/project-edit/project-edit.component";
import { PaymentComponent } from "./payment/payment.component";
import { RecipientsComponent } from "./recipients/recipients.component";
import { PaymentEditComponent } from "./payment/payment-edit/payment-edit.component";

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
  {
    path: 'payment',
    component: PaymentComponent,
    children:[
      {path: 'new', component: PaymentEditComponent},
      {path: 'edit/:id', component: PaymentEditComponent},
    ],
  },
  {path: 'recipients', component: RecipientsComponent}
];
