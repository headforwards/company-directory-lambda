import React from 'react';

export interface ErrorMessageProps {
  // error: {
  message: string,
  debugProp?: string
  // }
}

const ErrorMessage: React.SFC<ErrorMessageProps> = ({ message, debugProp }) => {
  let debug = null;
  if (debugProp) {
    debug = <pre className="alert-pre border bg-light p-2"><code>{debugProp}</code></pre>;
  }
  return (

    <div className="flex items-center justify-center pa4 bg-lightest-red black">
      <p className="mb-3">{message}</p>
      {debug}
      <span className="lh-title ml3">Some info that you want to call attention to.</span>
    </div>

  );
}

export default ErrorMessage