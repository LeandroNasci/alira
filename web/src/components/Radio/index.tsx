import React, { InputHTMLAttributes } from 'react';

import './styles.css'

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: string;
}

const Radio: React.FC<RadioProps> = ({ name, value, children, ...rest }) => {
  return (
    <div className="radio-block">
      <input type="radio" name={name} value={value} {...rest} />
      <label className="radio-label" htmlFor={name} >
        {children}
      </label>
    </div>
  )
}

export default Radio;
