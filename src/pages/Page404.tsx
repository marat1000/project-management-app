import { langConfig } from 'language/langConfig';
import React, { memo } from 'react';
import { useAppSelector } from 'store/hooks';
import { selectLanguage } from 'store/slices/settings/settingsSelectors';

export const Page404 = memo(() => {
  const lang = useAppSelector(selectLanguage);

  return <p className="error-404">{langConfig.message404[lang]}</p>;
});
