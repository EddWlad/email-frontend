import { Recipients } from "./recipients";

export class MailingGroup{
  idMailingGroup: number = 0;
  nameGroup: string;
  recipientIds: number[];
  recipientNames: string[];
  description: string;
  status: number = 0;
}
