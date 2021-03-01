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
  { touchCenterPer: number; isTouchIn: boolean }
> {
  public static CellAccessoryType = CellAccessoryType
  cellRef = React.createRef<HTMLDivElement>()

  startPos = 0

  state = {
    touchCenterPer: 0,
    isTouchIn: false,
  }

  handleTouch = (e: TouchEvent) => {
    // console.log(e)
    this.startPos = e.targetTouches.item(0)?.pageX || 0

    this.setState({
      isTouchIn: true,
    })
  }
  handleMove = (e: TouchEvent) => {
    if (!this.state.isTouchIn) return
    const $cell = this.cellRef.current
    if (!$cell) {
      return
    }
    const width = $cell.offsetWidth

    const cur = e.targetTouches.item(0)?.pageX || 0

    const touchCenterPer = ((cur - width / 2) / width) * 2
    this.setState({
      touchCenterPer,
    })
  }

  handleTouchEnd = (e: TouchEvent) => {
    this.startPos = 0
    let touchCenterPer = this.state.touchCenterPer
    if (Math.abs(this.state.touchCenterPer) < 0.38) {
      touchCenterPer = 0
    } else touchCenterPer = this.state.touchCenterPer < 0 ? -1 : 1
    this.setState({
      isTouchIn: false,
      touchCenterPer: touchCenterPer,
    })
  }

  componentDidMount() {
    const $cell = this.cellRef.current
    if (!$cell) {
      return
    }

    $cell.addEventListener('touchstart', this.handleTouch)
    $cell.addEventListener('touchmove', this.handleMove)
    $cell.addEventListener('touchend', this.handleTouchEnd)
  }

  componentWillUnmount() {
    const $cell = this.cellRef.current
    if (!$cell) {
      return
    }

    $cell.removeEventListener('touchstart', this.handleTouch)
    $cell.removeEventListener('touchmove', this.handleMove)
    $cell.removeEventListener('touchend', this.handleTouchEnd)
  }

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
        {({ cache, onLeftAction, onRightAction }) => {
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
                  ref={this.cellRef}
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
                  <div className={styles['back-overlay']}>
                    <div
                      className={styles['info-btn']}
                      onClick={() => {
                        onLeftAction(item)
                        this.setState({
                          touchCenterPer: 0,
                        })
                      }}
                    >
                      Info
                    </div>
                    <div
                      className={styles['delete-btn']}
                      onClick={() => {
                        onRightAction(item)
                        this.setState({
                          touchCenterPer: 0,
                        })
                      }}
                    >
                      Delete
                    </div>
                  </div>
                  <div
                    style={{
                      transform: `translate3d(${
                        this.state.touchCenterPer * 70
                      }px,0px, 0px)`,
                      transition: this.state.isTouchIn
                        ? undefined
                        : `transform .2s`,
                    }}
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
