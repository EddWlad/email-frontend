import { Recipients } from "./recipients";

export class MailingGroup{
  id: number = 0;
  nameGroup: string;
  recipientIds: number[];
  recipientNames: string[];
  description: string;
  status: number = 0;
}
