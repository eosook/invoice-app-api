export interface InvoiceInfo {
    invoiceId: string;
    createdAt: string;
    paymentDue: string;
    description: string;
    paymentTerms: number;
    status: 'pending' | 'paid' | 'draft'; 
    total: number;
    clientName: string;
    clientEmail: string;
  
    clientaddress_city: string;
    clientaddress_country: string;
    clientaddress_postCode: string; 
    clientaddress_street: string; 
  
    senderaddress_city: string;
    senderaddress_country: string;
    senderaddress_postCode: string;  
    senderaddress_street: string;
  }