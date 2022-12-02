import React, { ReactNode } from 'react';
import { withTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

interface IProps {
  children?: ReactNode;
  t: TFunction;
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
    const { t } = this.props;

    if (this.state.hasError) {
      // Можно отрендерить запасной UI произвольного вида
      return <span className={`error-boundary`}>{t(`somethingWentWrong`)}</span>;
    }

    return this.props.children;
  }
}

const ErrorBoundaryI18next = withTranslation()(ErrorBoundary);

export default ErrorBoundaryI18next;
