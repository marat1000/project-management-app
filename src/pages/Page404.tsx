import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

export const Page404 = memo(() => {
  const { t } = useTranslation();

  return <p className="error-404">{t(`message404`)}</p>;
});
