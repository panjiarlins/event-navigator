import React from 'react';
import Link from 'next/link';
import classes from './Button.module.css';

type ButtonProps =
  | { children: React.ReactNode; link: string; onClick?: never }
  | { children: React.ReactNode; onClick: () => void; link?: never };

function Button({ children, link, onClick }: ButtonProps): JSX.Element {
  if (link) {
    return (
      <Link href={link} className={classes.btn}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes.btn} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
