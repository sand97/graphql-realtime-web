import React from 'react';
import ErrorHandler from './ErrorHandler.component';

const withErrorHandler =
  (ChildComponent: any, errorElement?: React.ReactNode, onError?: Function) =>
  (props: any) => (
    <ErrorHandler errorElement={errorElement} onError={onError}>
      <ChildComponent {...props} />
    </ErrorHandler>
  );

export default withErrorHandler;
