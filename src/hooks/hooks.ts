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

export const useDrag = (
  ref: React.RefObject<HTMLDivElement>,
  onDragEnterCb?: (e: React.DragEvent<HTMLDivElement>) => void,
  onDragOverCb?: (e: React.DragEvent<HTMLDivElement>) => void,
  onDragLeaveCb?: (e: React.DragEvent<HTMLDivElement>) => void,
  onDropCb?: (e: React.DragEvent<HTMLDivElement>) => void
) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    if (!ref.current) {
      return;
    }

    // to prevent enter event on child elements
    if (isDragOver) {
      return;
    }
    onDragEnterCb && onDragEnterCb(e);
    setIsDragOver(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    if (!ref.current) {
      return;
    }

    // to prevent leave event on child elements
    const x = e.clientX;
    const y = e.clientY;
    const rect = ref.current.getBoundingClientRect();
    if (x > rect.x && x < rect.x + rect.width && y > rect.y && y < rect.y + rect.height) {
      return;
    }

    onDragLeaveCb && onDragLeaveCb(e);
    setIsDragOver(false);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    if (!isDragOver) return;
    onDragOverCb && onDragOverCb(e);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    onDropCb && onDropCb(e);
    setIsDragOver(false);
  };

  return {
    isDragOver,
    bind: {
      onDragEnter,
      onDragLeave,
      onDragOver,
      onDrop,
    },
  };
};
