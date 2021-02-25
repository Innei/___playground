/*
 * @Author: Innei
 * @Date: 2021-02-25 12:18:24
 * @LastEditTime: 2021-02-25 12:20:02
 * @LastEditors: Innei
 * @FilePath: /RTableView/src/components/separator/index.tsx
 * @Mark: Coding with Love
 */
import clsx from 'clsx';
import React from 'react';
import { FC } from 'react';
import styles from './index.module.css';

interface SeparatorProps {
  absolute?: boolean;
  width?: 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9;
  className?: string | undefined;
}
export const Separator: FC<SeparatorProps> = props => {
  const { absolute } = props;
  return (
    <div
      className={clsx(
        styles['separator'],
        absolute && styles['ab'],
        props.className
      )}
      style={props.width ? { transform: `scaleY(${props.width})` } : undefined}
    ></div>
  );
};
