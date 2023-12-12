import React from 'react';
import classes from './LogisticsItem.module.css';

type LogisticsItemProps = {
  children: React.ReactNode;
  icon: React.ComponentType;
};

function LogisticsItem({
  children,
  icon: Icon,
}: LogisticsItemProps): JSX.Element {
  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        <Icon />
      </span>
      <span className={classes.content}>{children}</span>
    </li>
  );
}

export default LogisticsItem;
