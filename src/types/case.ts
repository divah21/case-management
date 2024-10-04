// src/types/case.ts
export interface Case {
    id: string;
    row: string;
    uz_cr_ref: string;
    uz_rrb_ref: string;
    police_station_ref: string;
    case_date_received: string;
    time_received: string;
    complainant_name: string;
    complainant_regnumber: string;
    complainant_department: string;
    complainant_programme: string;
    complainant_age: string;
    complainant_gender: string;
    complainant_address: string;
    complainant_mobile: string;
    accused_name: string;
    accused_reg_number: string;
    accused_department: string;
    accused_programme: string;
    accused_age: string;
    accused_gender: string;
    accused_address: string;
    accused_mobile: string;
    offense: string;
    offense_date_of_occurance: string;
    place_of_occurance: string;
    modus_operandi: string;
    property_list: string;
    property_value_stolen: string;
    property_value_recorded: string;
    property_exhibit_book_reference: string;
    investigating_officer_name: string;
    investigating_officer_designation: string;
    date: string;
    total: string;// If this is the missing field
    // Add any other fields required by the map function
  };

  export interface CaseData {
    id: string;
    row: string;
    uz_cr_ref: string;
    uz_rrb_ref: string;
    police_station_ref: string;
    case_date_received: string;
    time_received: string;
    complainant_name: string;
    complainant_regnumber: string;
    complainant_department: string;
    complainant_programme: string;
    complainant_age: string;
    complainant_gender: string;
    complainant_address: string;
    complainant_mobile: string;
    accused_name: string;
    accused_reg_number: string;
    accused_department: string;
    accused_programme: string;
    accused_age: string;
    accused_gender: string;
    accused_address: string;
    accused_mobile: string;
    offense: string;
    offense_date_of_occurance: string;
    place_of_occurance: string;
    modus_operandi: string;
    property_list: string;
    property_value_stolen: string;
    property_value_recorded: string;
    property_exhibit_book_reference: string;
    investigating_officer_name: string;
    investigating_officer_designation: string;
    date: string;
    total: string;
    // Add any other fields from `caseData` that you need
  }
 
  