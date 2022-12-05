import React from 'react';
import { memo } from 'react';
import Select, { components, DropdownIndicatorProps, GroupBase } from 'react-select';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectIsDark, selectLanguage } from 'store/slices/settings/settingsSelectors';
import { changeLang, ELang } from 'store/slices/settings/settingsSlice';
import { langConfig } from 'language/langConfig';

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
  const lang = useAppSelector(selectLanguage);
  const dispatch = useAppDispatch();

  const isDark = useAppSelector(selectIsDark);

  const options = [
    { value: ELang.ENG, label: langConfig.eng[lang] },
    { value: ELang.RUS, label: langConfig.ru[lang] },
  ];

  return (
    <Select
      className={`header__lang`}
      classNamePrefix="select"
      onChange={(selectedOption?: MyOption | MyOption[] | null | unknown) => {
        if (Array.isArray(selectedOption)) {
          throw new Error('Unexpected type passed to ReactSelect onChange handler');
        }
        dispatch(changeLang((selectedOption as MyOption).value as ELang));
      }}
      value={lang === ELang.ENG ? options[0] : options[1]}
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
          width: '40px',
          fontFamily: 'Audi Type',
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '18px',
          lineHeight: '22px',
          color: isDark ? '#D9D9D9' : '#000000',
        }),
        option: (provided, state) => ({
          ...provided,
          color: isDark ? '#FFFFFF' : '#262626',
          backgroundColor: isDark ? '#262626' : '#FFFFFF',
          cursor: 'pointer',
        }),
        menuList: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: isDark ? '#262626' : '#FFFFFF',
        }),
      }}
    ></Select>
  );
});

const TriangleSVG = memo(() => {
  const isDark = useAppSelector(selectIsDark);
  return (
    <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 4.5L0.833333 0.333333H9.16667L5 4.5Z" fill={isDark ? '#D9D9D9' : '#000000'} />
    </svg>
  );
});
