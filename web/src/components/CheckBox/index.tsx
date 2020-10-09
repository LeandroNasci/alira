import React, { InputHTMLAttributes } from 'react';

import './styles.css'

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const CheckBox: React.FC<RadioProps> = ({ name, children, ...rest }) => {
  return (
    <div className="checkbox-block">
      <input type="checkbox" name={name} {...rest} />
      <label className="checkbox-label" htmlFor={name} >
        {children}
      </label>
  </div>
  )
}

export default CheckBox;
