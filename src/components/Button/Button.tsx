import { langConfig } from 'language/langConfig';
import React, { memo, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { selectLanguage } from 'store/slices/settings/settingsSelectors';

interface IButtonProps {
  to?: string;
  children?: ReactNode;
  color?: 'main' | 'add';
  onClick?: () => void;
  isLoading?: boolean;
}

export const Button = memo<IButtonProps>(({ to, isLoading, children, color = 'main', onClick }) => {
  const lang = useAppSelector(selectLanguage);
  const styles = ['button'];
  color === 'main' ? styles.push('button_main') : styles.push('button_add');

  const button = (
    <button onClick={onClick} className={styles.join(' ')} disabled={isLoading}>
      {isLoading ? langConfig.loading[lang] : children}
    </button>
  );

  return to ? <Link to={to}>{button}</Link> : button;
});
