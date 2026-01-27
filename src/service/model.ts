export interface EmailContact {
  email: string;
  name: string;
}

export interface sendEmailParams {
  sender: EmailContact;
  to: EmailContact[];
  subject: string;
  htmlContent: string;
  textContent?: string;
}
