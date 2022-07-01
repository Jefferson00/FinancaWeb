export type IncomeFormData = {
  name: string;
  value: string;
  status: boolean;
  receiptDefault: string;
  category: string;
  iteration: string;
  startDate: string;
};

export type ExpanseFormData = {
  name: string;
  value: string;
  status: boolean;
  receiptDefault: string;
  category: string;
  iteration: string;
  startDate: string;
};

export type UserFormData = {
  name: string;
  email: string;
  phone?: string;
};
