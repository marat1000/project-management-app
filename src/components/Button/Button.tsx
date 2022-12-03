import React, { memo, ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface IButtonProps {
  to?: string;
  children?: ReactNode;
  color?: 'main' | 'add';
  onClick?: () => void;
  isLoading?: boolean;
}

export const Button = memo<IButtonProps>(({ to, isLoading, children, color = 'main', onClick }) => {
  const { t } = useTranslation();
  const styles = ['button'];
  color === 'main' ? styles.push('button_main') : styles.push('button_add');

  // const [w, ww] = useState(0);
  // const onClick1 = () => {
  //   ww(w + 1);
  // };
  // useEffect(() => {
  //   if (w === 2) {
  //     throw new Error('I crashed!');
  //   }
  // });

  const button = (
    <button onClick={onClick} className={styles.join(' ')}>
      {isLoading ? t(`loading`) : children}
    </button>
  );

  return to ? <Link to={to}>{button}</Link> : button;
});
