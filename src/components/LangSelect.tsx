import React from 'react';
import { memo } from 'react';
import Select, { components, DropdownIndicatorProps, GroupBase } from 'react-select';
import { IReactSelectOptions } from '../ts/interfaces';

const options = [
  { value: 'eng', label: 'Eng' },
  { value: 'ru', label: 'Ru' },
];

const DropdownIndicator = (
  props: JSX.IntrinsicAttributes & DropdownIndicatorProps<unknown, boolean, GroupBase<unknown>>
) => {
  return (
    <components.DropdownIndicator {...props}>
      <TriangleSVG />
      {/*<EmojiIcon label="Emoji" primaryColor={colourOptions[2].color} />*/}
    </components.DropdownIndicator>
  );
};

export const LangSelect = memo(() => {
  return (
    <Select
      className={`header__lang`}
      isRtl={true}
      defaultValue={options[0]}
      options={options}
      components={{ DropdownIndicator, IndicatorSeparator: () => null }}
      // components={{
      //   IndicatorSeparator: () => null,
      // }}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          border: `none`,
          outline: `none`,
          backgroundColor: `transparent`,
        }),
        container: (baseStyles, state) => ({
          ...baseStyles,
          display: `flex`,
          flexWrap: `nowrap`,
        }),
        singleValue: (baseStyles, state) => ({
          ...baseStyles,
          width: `35px`,
          fontFamily: 'Audi Type',
          fontStyle: `normal`,
          fontWeight: 400,
          fontSize: `18px`,
          lineHeight: `22px`,
          color: `#000000`,
        }),
      }}
    />
  );
});

const TriangleSVG = memo(() => {
  return (
    <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 4.5L0.833333 0.333333H9.16667L5 4.5Z" fill="#000000" />
    </svg>
  );
});
