import React from 'react';
import { memo } from 'react';
import Select, { components, DropdownIndicatorProps, GroupBase } from 'react-select';
import { useTranslation } from 'react-i18next';

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

type MyOption = { label: string; value: string };

export const LangSelect = memo(() => {
  const { t } = useTranslation();
  const options = [
    { value: 'en', label: t(`en`) },
    { value: 'ru', label: t(`ru`) },
  ];
  const { i18n } = useTranslation();

  return (
    <Select
      className={`header__lang`}
      classNamePrefix="select"
      onChange={(selectedOption?: MyOption | MyOption[] | null | unknown) => {
        if (Array.isArray(selectedOption)) {
          throw new Error('Unexpected type passed to ReactSelect onChange handler');
        }
        i18n.changeLanguage((selectedOption as MyOption).value);
      }}
      value={i18n.language === `ru` ? options[1] : options[0]}
      isRtl={true}
      options={options}
      components={{ DropdownIndicator, IndicatorSeparator: () => null }}
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
        option: (provided, state) => ({
          ...provided,
          color: state.isSelected ? 'white' : 'black',
        }),
      }}
    ></Select>
  );
});

const TriangleSVG = memo(() => {
  return (
    <svg width="10" height="5" viewBox="0 0 10 5" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 4.5L0.833333 0.333333H9.16667L5 4.5Z" />
    </svg>
  );
});
