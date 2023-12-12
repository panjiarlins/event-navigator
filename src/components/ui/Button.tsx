import React from 'react';
import Link from 'next/link';
import classes from './Button.module.css';

type ButtonProps = {
  children: React.ReactNode;
  link: string;
};

function Button({ children, link }: ButtonProps): JSX.Element {
  return (
    <Link href={link} className={classes.btn}>
      {children}
    </Link>
  );
}

export default Button;
