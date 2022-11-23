import React, { memo, ReactNode, SyntheticEvent } from 'react';
import { createPortal } from 'react-dom';
import { SmoothCorners } from 'react-smooth-corners';

interface IModalProps {
  close: () => void;
  children: ReactNode;
  title: string;
}

export const Modal = memo<IModalProps>(({ title, children, close }) => {
  const element = (
    <div className="modal__overlay" onClick={close}>
      <SmoothCorners
        corners="22, 16"
        borderRadius="25px"
        as="div"
        className="modal__container"
        onClick={(e: SyntheticEvent) => e.stopPropagation()}
      >
        <div className="modal__header">
          <h2>{title}</h2>
          <button onClick={close} className="modal__close">
            ✖
          </button>
        </div>
        {children}
      </SmoothCorners>
    </div>
  );
  const target = document.body;
  return createPortal(element, target);
});
