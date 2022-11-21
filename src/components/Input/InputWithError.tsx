import { useInput } from 'hooks/hooks';
import React, { forwardRef, SyntheticEvent, useEffect, useState } from 'react';
import { EInputTypes, EPattern } from './Input';

interface IInputWithErrorProps {
  initialValue?: string;
  pattern: EPattern;
  placeholder: string;
  type: EInputTypes;
}

export const InputWithError = forwardRef<HTMLInputElement, IInputWithErrorProps>(
  ({ initialValue = '', placeholder, pattern, type }, ref) => {
    const bind = useInput(initialValue);
    const [isValid, setIsValid] = useState(true);

    const onBlur = (e: SyntheticEvent<HTMLInputElement>) => {
      // тут инпут проверяет сам себя
      const valid = e.currentTarget.checkValidity();
      setIsValid(valid);
    };

    const onFocus = (e: SyntheticEvent<HTMLInputElement>) => {
      // тут он сбрасывает ошибку, когда пользователь полез его менять
      setIsValid(true);
    };

    const onInvalid = () => {
      // тут он захендлит когда его родитель вызовет по рефу checkValidity
      setIsValid(false);
    };

    return (
      <input
        type={type}
        ref={ref}
        placeholder={placeholder}
        pattern={pattern}
        onBlur={onBlur}
        onFocus={onFocus}
        onInvalid={onInvalid}
        style={isValid ? {} : { color: 'red' }}
        {...bind}
      ></input>
    );
  }
);
