import React, { createContext, useContext, useState, useCallback } from 'react';

export interface FormData {
  email: string;
  phone: string;
  cpf?: string;
  cnpj?: string;
  invoice: {
    iFirstname: string;
    iLastname: string;
    iCep: string;
    iStreet: string;
    iNumber: string;
    iComplement: string;
    iDistrict: string;
    iCity: string;
    iState: string;
    iCountry: string;
  };
  shippingAddress: {
    firstname: string;
    lastname: string;
    cep: string;
    street: string;
    number: string;
    complement: string;
    district: string;
    city: string;
    state: string;
    country: string;
  };
}

interface FormDataContext {
  formData: FormData;
  updateFormData(object: FormData): void;
}

/* provide the initial value of the context */
const FormDataContext = createContext<FormDataContext | null>(null);


/* define provider functions  */
const FormDataProvider: React.FC = ({ children }) => {

  const [formData,setFormData] = useState<FormData>({
    email: '',
    phone: '',
    cpf: '',
    cnpj: '',
    invoice: {
      iFirstname: '',
      iLastname: '',
      iCep: '',
      iStreet: '',
      iNumber: '',
      iComplement: '',
      iDistrict: '',
      iCity: '',
      iState: '',
      iCountry: '',
    },
    shippingAddress: {
      firstname: '',
      lastname: '',
      cep: '',
      street: '',
      number: '',
      complement: '',
      district: '',
      city: '',
      state: '',
      country: '',
    },
  });


  const updateFormData = useCallback((newValues: FormData) => {
    setFormData(newValues)
  },[])


  return (
    <FormDataContext.Provider value={{
      formData,
      updateFormData
    }}>
      {children}
    </FormDataContext.Provider>
  );
}

/* use hook context */
function useFormData(): FormDataContext {
  const context = useContext(FormDataContext)

  if (!context) {
    throw new Error('useFormData must be used within a FormDataProvider')
  }

  return context;
}

export { FormDataProvider, useFormData };
