// src/types/caseTypes.ts
export interface Case {
    id: string;
    client: {
      name: string;
      email: string;
    };
    date: string;
    status: string;
    country: string;
    total: string;
    complainant_name: string;
    complainant_contact: string;
    complainant_address: string;
    accused_name: string;
    accused_dept: string;
    accused_gender: string;
    accused_address: string;
    accused_contact: string;
    offence: string;
    date_occurance: string;
    place_of_occurance: string;
    mod_operandi: string;
    property_list: string;
    value_stolen: string;
    value_recorded: string;
    exhibit_book_ref: string;
    investigation_officer: string;
  }
  