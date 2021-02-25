/*
 * @Author: Innei
 * @Date: 2021-02-24 16:42:55
 * @LastEditTime: 2021-02-25 14:59:39
 * @LastEditors: Innei
 * @FilePath: /RTableView/src/components/RTableView/index.tsx
 * @Mark: Coding with Love
 */
import * as React from 'react'
import 'react-virtualized/styles.css'
import styles from './index.module.css'

import List, { ListRowProps } from 'react-virtualized/dist/commonjs/List'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import clsx from 'clsx'
import { Separator } from '../separator'
import CellMeasurer, {
  CellMeasurerCache,
} from 'react-virtualized/dist/es/CellMeasurer'
import InfiniteLoader from 'react-virtualized/dist/es/InfiniteLoader'
import { Index, ScrollParams } from 'react-virtualized'
// @ts-ignore
import Pullable from 'react-pullable'

const Context = React.createContext<{ cache: CellMeasurerCache }>({
  cache: null!,
})
// const cache = new CellMeasurerCache({
//   fixedWidth: true,
//   minHeight: 50,
// })

interface RTableViewProps {
  cellProps?: Omit<RTableCellProps, 'item'>
  data: CellContentDataType[]
  onLoadMore?: () => Promise<any>
  didSelectRowAt?: (index: number) => any
  onPullToRefresh?: () => void
}
function getIndex(node: HTMLElement | null | undefined): string | void {
  if (!node) return
  if (node.dataset['index']) return node.dataset['index']
  return getIndex(node.parentElement)
}
export const RTableView = React.forwardRef<List, RTableViewProps>(
  (props, ref) => {
    const {
      cellProps,
      data,
      onLoadMore,
      didSelectRowAt,
      onPullToRefresh,
    } = props
    const cache = new CellMeasurerCache({
      fixedWidth: true,
      minHeight: 50,
    })
    const rowRender: React.FC<ListRowProps> = (props) => {
      return <RTableCell {...props} {...cellProps} item={data[props.index]} />
    }
    const isRowLoaded: (params: Index) => boolean = ({ index }) =>
      index < data.length

    const [canPull, setCanPull] = React.useState(true)
    return (
      <Context.Provider value={{ cache: cache }}>
        <AutoSizer>
          {({ height, width }) => (
            <InfiniteLoader
              isRowLoaded={isRowLoaded}
              loadMoreRows={async () => {
                await onLoadMore?.()
              }}
            >
              {({ onRowsRendered, registerChild }) => {
                return (
                  <Pullable
                    className={styles['puller']}
                    onRefresh={() => {
                      onPullToRefresh?.()
                    }}
                    centerSpinner={true}
                    spinnerColor="#000"
                    disabled={!canPull || !onPullToRefresh}
                    // shouldPullToRefresh={() => }
                  >
                    <div
                      onClick={(e) => {
                        const $$ = e.target as HTMLElement
                        const index = parseInt(getIndex($$) as any)

                        if (index) {
                          didSelectRowAt?.(index)
                        }
                      }}
                    >
                      <List
                        ref={ref}
                        className={styles['table-view']}
                        height={height}
                        onRowsRendered={onRowsRendered}
                        width={width}
                        deferredMeasurementCache={cache}
                        rowHeight={cache.rowHeight}
                        overscanRowCount={30}
                        rowCount={data.length}
                        rowRenderer={rowRender}
                        onScroll={(e: ScrollParams) => {
                          if (e.scrollTop == 0) {
                            setCanPull(true)
                          } else {
                            setCanPull(false)
                          }
                          if (e.clientHeight + e.scrollTop == e.scrollHeight) {
                            onLoadMore?.()
                          }
                        }}
                      />
                    </div>
                  </Pullable>
                )
              }}
            </InfiniteLoader>
          )}
        </AutoSizer>
      </Context.Provider>
    )
  },
)
export type RLabel = {
  text?: string
  attributedText?: JSX.Element
}
export type RImage = {
  src: string
}
export type CellContentDataType = { textLabel?: RLabel; detailLabel?: RLabel }
export type RTableCellProps<
  T extends CellContentDataType = CellContentDataType
> = {
  item: T
  accessoryType?: CellAccessoryType
  textLabel?: (item: T) => RLabel
  detailLabel?: (item: T) => RLabel
  contentView?: (item: T) => JSX.Element | null | undefined
  imageView?: RImage

  cellRenderAnimation?: boolean
}
enum CellAccessoryType {
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
                        <span className={styles['title']}>
                          {item.textLabel?.attributedText ??
                            item.textLabel?.text}
                        </span>
                        <span className={styles['detail']}>
                          {item.detailLabel?.attributedText ??
                            item.detailLabel?.text}
                        </span>
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
