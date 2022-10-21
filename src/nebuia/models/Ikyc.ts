export interface DocumentNumber {
  value?: string;
  hash?: string;
  valid?: boolean;
}

export interface Dob2 {
  value?: string;
  hash?: string;
  valid?: boolean;
}

export interface Expiry {
  value?: string;
  hash?: string;
  valid?: boolean;
}

export interface FinalCheck {
  value?: string;
  hash?: string;
  valid?: boolean;
}

export interface Expiry2 {
  year?: number;
  month?: string;
  day?: number;
  original?: string;
}

export interface Optional {
  value?: string;
  valid?: boolean;
}

export interface Extra {
  elector_key?: string;
  register_month?: string;
  register_year?: string;
  section?: string;
  validity?: string;
}

export interface Validations {
  register_month_validation?: boolean;
  section_validation?: boolean;
}

export interface Description {
  father_last_name?: string;
  mother_last_name?: string;
}

export interface Country {
  abbr?: string;
  full?: string;
}

export interface Nationality {
  abbr?: string;
  full?: string;
}

export interface Dob {
  year?: number;
  month?: string;
  day?: number;
  original?: string;
}

export interface Sex {
  abbr?: string;
  full?: string;
}

export interface CheckDigit {
  document_number?: DocumentNumber;
  dob?: Dob2;
  expiry?: Expiry;
  final_check?: FinalCheck;
  valid?: boolean;
}

export interface Liveness {
  score?: number;
  status?: boolean;
}

export interface Match {
  similarity?: number;
  status?: boolean;
}

export interface Names {
  last_name?: string;
  names?: string[];
  description?: Description;
}

export interface Document {
  document_code?: string;
  document_type?: string;
  document_number?: string;
  issuer: string;
  names?: Names;
  country?: Country;
  nationality?: Nationality;
  dob?: Dob;
  sex?: Sex;
  check_digit?: CheckDigit;
  expiry?: Expiry2;
  personal_number?: string;
  address?: string[];
  optionals?: Optional[];
  extra?: Extra;
  validations?: Validations;
}

export interface Face {
  liveness?: Liveness;
  match?: Match;
}

export interface IKYC {
  id?: string;
  company?: string;
  face?: Face;
  document?: Document;
  email: {
    email: string;
    verified: boolean;
  };
  phone: {
    phone: string;
    verified: boolean;
  };
}
