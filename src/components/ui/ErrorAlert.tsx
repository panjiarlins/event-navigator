import React from 'react';
import classes from './ErrorAlert.module.css';

type ErrorAlertProps = {
  children: React.ReactNode;
};

function ErrorAlert({ children }: ErrorAlertProps): JSX.Element {
  return <div className={classes.alert}>{children}</div>;
}

export default ErrorAlert;
