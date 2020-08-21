import React from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import './InputGroup.scss';
import Icon from '../../UI/Icon/Icon';
const InputGroup = ({ label, handleChange, inputGroupAlign, inputStyle, ...otherProps }) => {
  return (
    <div className={`input-group input-group--${inputGroupAlign}`}>
      {label ? (
        <label
          className={`input-group__label  ${
            otherProps.value.length ? 'input-group__label--shrink' : ''
          } `}>
          {<Icon className='input-group__icon' icon={label} color='black' />}
          {label}
        </label>
      ) : null}
      {otherProps.textarea ? (
        <TextareaAutosize
          className='input-group__textarea'
          onChange={(event) => handleChange(event)}
          {...otherProps}
        />
      ) : (
        <input
          className={`input-group__input  input-group__input--${inputStyle}`}
          type={otherProps.type}
          // onChange={(event) => handleChange({ [label]: event.target.value })}
          onChange={(event) => handleChange(event)}
          {...otherProps}
        />
      )}
    </div>
  );
};

export default InputGroup;
