export interface Payeer {
  document: string;
  name: string;
}

export interface Transfer {
  value: number;
  date: string;
  currency: string;
  payeer: Payeer;
}

export interface TransferRequest {
  value: number;
  currency: string;
  payeerDocument: string;
  transferDate: string;
}

export interface TransferResponse {
  status: string;
}

export interface TransferFilters {
  name: string;
  minValue: string;
  maxValue: string;
  startDate: string;
  endDate: string;
}
