import React, { memo, ReactNode } from 'react';
import { SmoothCorners } from 'react-smooth-corners';

interface ICentralContainerProps {
  children?: ReactNode;
  className?: string;
}

export const CentralContainer = memo<ICentralContainerProps>(({ children, className }) => {
  const style = ['block_transparent'];
  if (className) {
    style.push(className);
  }
  return (
    <SmoothCorners corners="22, 16" borderRadius="25px" as="div" className={style.join(' ')}>
      {children}
    </SmoothCorners>
  );
});
