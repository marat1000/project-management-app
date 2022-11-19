import React, { memo, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface IButtonProps {
  to?: string;
  children?: ReactNode;
  color?: 'main' | 'add';
  onClick?: () => void;
}

export const Button = memo<IButtonProps>(({ to, children, color = 'main', onClick }) => {
  const styles = ['button'];
  color === 'main' ? styles.push('button_main') : styles.push('button_add');
  const button = (
    <button onClick={onClick} className={styles.join(' ')}>
      {children}
    </button>
  );

  return to ? <Link to={to}>{button}</Link> : button;
});
