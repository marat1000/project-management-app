import { useState } from 'react';

export const useInput = (initialState = '') => {
  const [value, setValue] = useState(initialState);

  const onChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setValue(value);
  };

  return {
    value,
    onChange,
  };
};

export const useInputWithCb = (
  cb: (e: React.SyntheticEvent<HTMLInputElement>) => void,
  initialState = ''
) => {
  const [value, setValue] = useState(initialState);

  const onChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    cb(e);
    const { value } = e.currentTarget;
    setValue(value);
  };

  return {
    value,
    onChange,
  };
};
