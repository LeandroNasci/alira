import React, {InputHTMLAttributes} from 'react';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const ToggleSwitch: React.FC<InputProps> = ({ name, ...rest }) => {
  return (
    <label className="switch">
      <input type="checkbox" name={name} id={name} { ...rest } />
      <span className="slider round"></span>
    </label>
  );
}

export default ToggleSwitch;
