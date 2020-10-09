import React, { InputHTMLAttributes } from 'react';
import MaskedInput from 'react-text-mask';

import '../Input/styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export const CEPInput: React.FC<InputProps> = ({ name, ...rest }) => {
  return (
    <div className="input-block">
      <MaskedInput
        type="text"
        name={name}
        id={name}
        mask={ [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/] }
        {...rest}
      />
    </div>
  )
}

export const CPFInput: React.FC<InputProps> = ({ name, ...rest }) => {
  return (
    <div className="input-block">
      <MaskedInput
        type="text"
        name={name}
        id={name}
        mask={ [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/] }
        {...rest}
      />
    </div>
  )
}

export const CNPJInput: React.FC<InputProps> = ({ name, ...rest }) => {
  return (
    <div className="input-block">
      <MaskedInput
        type="text"
        name={name}
        id={name}
        mask={ [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/ ,/\d/, /\d/ ,/\d/, '-', /\d/, /\d/] }
        {...rest}
      />
    </div>
  )
}

export const PhoneInput: React.FC<InputProps> = ({ name, ...rest }) => {
  return (
    <div className="input-block">
      <MaskedInput
        type="text"
        name={name}
        id={name}
        mask={ ['(', /[1-9]/,  /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/] }
        {...rest}
      />
    </div>
  )
}
