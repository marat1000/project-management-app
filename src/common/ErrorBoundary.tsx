import React, { memo, ReactNode } from 'react';
import { ELang } from 'store/slices/settings/settingsSlice';
import { langConfig } from 'language/langConfig';
import { useAppSelector } from 'store/hooks';
import { selectLanguage } from 'store/slices/settings/settingsSelectors';

interface IProps {
  children?: ReactNode;
  lang: ELang;
}

interface IState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
    return { hasError: true };
  }

  // componentDidCatch(error, errorInfo) {
  //   // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
  //   // logErrorToMyService(error, errorInfo);
  // }

  render() {
    const { lang } = this.props;

    if (this.state.hasError) {
      // Можно отрендерить запасной UI произвольного вида
      return <span className={`error-boundary`}>{langConfig.somethingWentWrong[lang]}</span>;
    }

    return this.props.children;
  }
}

const ErrorBoundaryWithLang = memo<{ children: ReactNode }>(({ children }) => {
  const lang = useAppSelector(selectLanguage);
  return <ErrorBoundary lang={lang}>{children}</ErrorBoundary>;
});

export default ErrorBoundaryWithLang;
