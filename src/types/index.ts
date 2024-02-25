export interface TreatmentFormData {
    patientName: string;
    patientID: string;
    date: Date;
    treatments: string[];
    medications: string[];
    cost: number;
  }
  
 export  interface Option {
    value: string;
    label: string;
  }
  
  
  
  export type InputError = {
    patientName: string;
    patientID: string;
    date: string;
    treatments: string;
    medications: string;
    cost: string;
  };
  