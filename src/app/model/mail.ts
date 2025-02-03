import { Attachments } from "./attachments";
import { MailingGroup } from "./mailingGroup";
import { PaymentAgreement } from "./paymentAgreement";
import { Project } from "./project";
import { Supplier } from "./supplier";

export class Mail{
  id: number;
  idRecipients: number;
  mailingGroup: MailingGroup;
  bill: string;
  priority: number;
  supplier: Supplier;
  project: Project;
  paymentAgreement: PaymentAgreement;
  dateCreate: string | Date;
  observation: string;
  attachments: Attachments[];
  status: number;
}
