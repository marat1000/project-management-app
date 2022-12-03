import React, { memo, ReactNode, SyntheticEvent } from 'react';
import { createPortal } from 'react-dom';
import { SmoothCorners } from 'react-smooth-corners';
import { useAppSelector } from 'store/hooks';
import { selectIsDark } from 'store/slices/settings/settingsSelectors';

interface IModalProps {
  close: () => void;
  children: ReactNode;
  title: string;
}

export const Modal = memo<IModalProps>(({ title, children, close }) => {
  const isDark = useAppSelector(selectIsDark);
  const element = (
    <div className="modal__overlay" onClick={close}>
      <SmoothCorners
        corners="22, 16"
        borderRadius="25px"
        as="div"
        className={isDark ? 'modal__container-dark' : 'modal__container'}
        onClick={(e: SyntheticEvent) => e.stopPropagation()}
      >
        <div className="modal__header">
          <h2 style={isDark ? { color: '#FFF' } : {}}>{title}</h2>
          <button style={isDark ? { color: '#FFF' } : {}} onClick={close} className="modal__close">
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
