import { useState } from 'react';

export const useInput = (initialState = '') => {
  const [value, setValue] = useState(initialState);

  const onChange = (e: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;
    setValue(value);
  };

  return {
    value,
    onChange,
  };
};

export const useTextArea = (initialState = '') => {
  const [value, setValue] = useState(initialState);

  const onChange = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;
    setValue(value);
  };

  return {
    value,
    onChange,
  };
};

export const useInputExtended = (initialState = '') => {
  const [value, setValue] = useState(initialState);

  const onChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setValue(value);
  };

  return {
    setValue,
    bind: {
      value,
      onChange,
    },
  };
};

export const useInputWithCb = <T extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement>(
  cb: (e: React.SyntheticEvent<T>) => void,
  initialState = ''
) => {
  const [value, setValue] = useState(initialState);

  const onChange = (e: React.SyntheticEvent<T>) => {
    cb(e);
    const { value } = e.currentTarget;
    setValue(value);
  };

  return {
    value,
    onChange,
  };
};
