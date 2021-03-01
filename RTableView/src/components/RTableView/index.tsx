/*
 * @Author: Innei
 * @Date: 2021-02-24 16:42:55
 * @LastEditTime: 2021-03-01 20:56:56
 * @LastEditors: Innei
 * @FilePath: /RTableView/src/components/RTableView/index.tsx
 * @Mark: Coding with Love
 */
import * as React from 'react'
import 'react-virtualized/styles.css'
import styles from './index.module.css'

import List, { ListRowProps } from 'react-virtualized/dist/commonjs/List'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import { CellMeasurerCache } from 'react-virtualized/dist/es/CellMeasurer'
import InfiniteLoader from 'react-virtualized/dist/es/InfiniteLoader'
import { Index, ScrollParams, WindowScroller } from 'react-virtualized'
// @ts-ignore
import Pullable from 'react-pullable'
import observable from '../../utils/observable'
import { RTableViewProps } from './types'
import { RTableCell } from './cell'

export const Context = React.createContext<{ cache: CellMeasurerCache }>({
  cache: null!,
})

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

    // bind resize event
    // React.useEffect(() => {
    //   const handler = () => {
    //     observable.emit('measure')
    //   }

    //   window.addEventListener('resize', handler)
    //   return () => {
    //     window.removeEventListener('resize', handler)
    //   }
    // }, [])

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
