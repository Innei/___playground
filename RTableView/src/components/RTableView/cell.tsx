import * as React from 'react'
import styles from './index.module.css'
import { ListRowProps } from 'react-virtualized/dist/commonjs/List'
import clsx from 'clsx'
import { Separator } from '../separator'
import CellMeasurer from 'react-virtualized/dist/es/CellMeasurer'
import { RTableCellProps } from './types'
import { Context } from './index'

export enum CellAccessoryType {
  none = 0,

  disclosureIndicator = 1,

  detailDisclosureButton = 2,
}
export class RTableCell extends React.PureComponent<
  ListRowProps & RTableCellProps,
  {}
> {
  public static CellAccessoryType = CellAccessoryType
  render() {
    const {
      columnIndex,
      index,
      style,
      isScrolling,
      isVisible,
      key,
      parent,

      accessoryType = 0,
      imageView,
      contentView,
      detailLabel,
      textLabel,
      item,

      cellRenderAnimation,
    } = this.props

    return (
      <Context.Consumer>
        {({ cache }) => {
          return (
            <CellMeasurer
              cache={cache}
              columnIndex={columnIndex}
              key={key}
              rowIndex={index}
              parent={parent}
            >
              {({ measure, registerChild }) => (
                <div
                  className={styles['cell-root']}
                  style={
                    cellRenderAnimation
                      ? {
                          ...style,

                          top: 0,
                          transform: `translate3d(0px,${style.top}px, 0px)`,
                          willChange: 'transform',
                          transition: '250ms transform',
                          // animation: 'fade 1.25s both',
                          // transition: 'top 250ms ease-in-out',
                        }
                      : style
                  }
                >
                  <div
                    style={
                      {
                        // transform: `translate3d(0px,${style.top}px, 0px)`,
                      }
                    }
                    data-index={index}
                    // @ts-ignore
                    ref={registerChild}
                    className={clsx(styles['cell'])}
                    key={key}
                  >
                    {index === 0 ? (
                      <Separator
                        className={clsx(styles['sep'], styles['top'])}
                      />
                    ) : null}
                    <div
                      className={clsx(
                        styles['view'],
                        imageView && styles['has-image'],
                        accessoryType && styles['has-access'],
                      )}
                    >
                      <div className={styles['content-view']}>
                        {contentView?.(item) ?? (
                          <>
                            <span className={styles['title']}>
                              {textLabel?.(item) ??
                                item.textLabel?.attributedText ??
                                item.textLabel?.text}
                            </span>
                            <span className={styles['detail']}>
                              {detailLabel?.(item) ??
                                item.detailLabel?.attributedText ??
                                item.detailLabel?.text}
                            </span>
                          </>
                        )}
                      </div>
                      <span className={styles['access']}>
                        {(() => {
                          switch (accessoryType) {
                            case 0:
                              return
                            case RTableCell.CellAccessoryType
                              .detailDisclosureButton: {
                              // TODO
                              return <span>i</span>
                            }
                            case RTableCell.CellAccessoryType
                              .disclosureIndicator: {
                              return (
                                <span
                                  className={styles['disclosure-indicator']}
                                ></span>
                              )
                            }
                          }
                        })()}
                      </span>
                    </div>
                  </div>
                  <Separator className={styles['sep']} />
                </div>
              )}
            </CellMeasurer>
          )
        }}
      </Context.Consumer>
    )
  }
}
