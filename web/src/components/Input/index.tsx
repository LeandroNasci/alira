import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Input: React.FC<InputProps> = ({ name, ...rest }) => {
  return (
    <div className="input-block">
      <input type="text" name={name} id={name} {...rest} />
    </div>
  );
}

export default Input;
