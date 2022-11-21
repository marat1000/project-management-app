import React, { memo, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { SmoothCorners } from 'react-smooth-corners';

interface IModalProps {
  isOpened: boolean;
  toggle: (flag: boolean) => void;
  children: ReactNode;
}

export const Modal = memo<IModalProps>(({ children, isOpened, toggle }) => {
  if (!isOpened) return null;

  const element = (
    <div className="modal__overlay" onClick={() => toggle(false)}>
      <SmoothCorners corners="22, 16" borderRadius="25px" as="div" className="modal__container">
        {children}
      </SmoothCorners>
    </div>
  );
  const target = document.body;
  return createPortal(element, target);
});
