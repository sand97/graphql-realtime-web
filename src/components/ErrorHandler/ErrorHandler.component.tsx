import React, {PureComponent} from 'react';
import styles from './ErrorHandler.module.css';

interface ErrorHandlerProps {
  errorElement?: React.ReactNode;
  onError?: Function;
  children?: React.ReactNode
}

interface ErrorHandlerState {
  hasError: boolean;
}

class ErrorHandler extends PureComponent<ErrorHandlerProps, ErrorHandlerState> {
  state = {
    hasError: false
  };

  static getDerivedStateFromError(error: any) {
    // Mettez à jour l'état, de façon à montrer l'UI de repli au prochain rendu.
    return {hasError: true};
  }

  componentDidCatch(error: any, info: any) {
    this.setState({hasError: true});
    const {
      onError = () => {
      }
    } = this.props;
    onError(error, info);
    console.log(error, info)
  }

  render() {
    const {
      errorElement = (
        <b className={styles.errorMessage}>Oh no, Something went wrong! :( </b>
      )
    } = this.props;
    if (this.state.hasError) {
      return errorElement;
    }
    try {
      return <>{this.props.children}</>;
    } catch (error) {
      this.setState({hasError: true});
      return errorElement;
    }
  }
}

export default ErrorHandler;
