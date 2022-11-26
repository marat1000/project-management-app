import { Button } from 'components/Button/Button';
import {
  EFormErrorMessages,
  EInputTypes,
  EPattern,
  InputWithErrorMessage,
} from 'components/Input/InputWithErrorMessage';
import { InputTextArea } from 'components/Input/TextArea';
import React, { SyntheticEvent, useState } from 'react';

const AddingTask = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const onDescriptionChange = (e: SyntheticEvent<HTMLTextAreaElement>) => {
    setDescription(e.currentTarget.value);
  };

  const onTitleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setDescription(e.currentTarget.value);
  };

  if (isAdding) {
    return (
      <div>
        <InputWithErrorMessage
          type={EInputTypes.text}
          pattern={EPattern.login}
          errorMessage={EFormErrorMessages.login}
          placeholder="title"
          onChangeCb={onTitleChange}
        />
        <InputTextArea
          placeholder="Description"
          onChangeCb={onDescriptionChange}
          initialValue={''}
        />
        <button onClick={() => console.log('add')}>Add</button>
        <button onClick={() => setIsAdding(false)}>Cancel</button>
      </div>
    );
  }
  return <button onClick={() => setIsAdding(true)}>Add +</button>;
};

export default AddingTask;
