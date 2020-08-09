import 'react-virtualized/styles.css'

import {
  List,
  AutoSizer,
  ListRowRenderer,
  Index,
  CellMeasurerCache,
  CellMeasurer,
} from 'react-virtualized'
import * as React from 'react'
import { FC } from 'react'
import { Message } from '../message'

const testMessageContent = ['This is a test message.', 'マジやばくね！']

const imageUrl = 'https://i.loli.net/2020/05/22/X2MVRDe1tyJil3O.jpg'
const imageHeight = 343
const imageWidth = 480

const getRandomContent = () => {
  const length = testMessageContent.length

  return testMessageContent[Math.floor(Math.random() * length)]
    .concat('\n')
    .repeat(Math.floor(Math.random() * 10))
}
const messageContents = Array(10000)
  .fill(null)
  .map((_, index) => {
    return 'id: '
      .concat(index.toString())
      .concat(' ')
      .concat(getRandomContent())
  })

const messageAttachment = Array(10000)
  .fill(null)
  .map(() => {
    const rare = Math.floor(Math.random() * 10)
    if (rare <= 5) {
      return {
        url: imageUrl,
        height: (rare / 10) * imageHeight,
        width: (rare / 10) * imageWidth,
      }
    } else {
      return null
    }
  })
export const DynamicList: FC = (props) => {
  const _cache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 50,
  })
  const [_messageContents, setMessageContents] = React.useState(
    messageContents.slice(1, 100),
  )
  function _rowRenderer({ index, key, parent, style }) {
    const imageWidth = 300
    const imageHeight = 300

    const source = `https://www.fillmurray.com/${imageWidth}/${imageHeight}`

    return (
      <CellMeasurer
        cache={_cache}
        columnIndex={0}
        key={key}
        rowIndex={index}
        parent={parent}
      >
        {({ measure, registerChild }) => (
          <div ref={registerChild} style={style}>
            <img
              onLoad={measure}
              src={source}
              style={{
                width: imageWidth,
              }}
            />
          </div>
        )}
      </CellMeasurer>
    )
  }
  const rowRenderer: ListRowRenderer = ({
    index,
    isScrolling,
    key,
    style,
    parent,
  }) => {
    // if (isScrolling) {
    //   return <div className=""></div>
    // }

    return (
      <CellMeasurer
        cache={_cache}
        columnIndex={0}
        key={key}
        rowIndex={index}
        parent={parent}
      >
        {({ measure, registerChild }) => {
          return (
            <div ref={registerChild} style={style}>
              <div>
                <p>Message Index: {index}</p>
                <Message
                  content={_messageContents[index]}
                  attachment={messageAttachment[index]?.url}
                  attachmentHeight={messageAttachment[index]?.height}
                  attachmentWidth={messageAttachment[index]?.width}
                />
              </div>
            </div>
          )
        }}
      </CellMeasurer>
    )
  }
  const ref = React.useRef<List>(null)

  React.useEffect(() => {
    if (!ref.current) {
      return
    }
    console.log(ref.current)
    setTimeout(() => {
      ref.current.scrollToRow(10000)
    })
  }, [])
  return (
    <AutoSizer>
      {({ width, height }) => {
        return (
          <List
            ref={ref}
            rowRenderer={rowRenderer}
            height={height}
            deferredMeasurementCache={_cache}
            overscanRowCount={3}
            rowCount={_messageContents.length}
            rowHeight={_cache.rowHeight}
            width={width}
            onScroll={(e) => {
              console.log(e)

              if (e.scrollTop < 10) {
                const startIndex = Math.floor(
                  Math.random() * (messageContents.length - 10),
                )
                setMessageContents([
                  ...messageContents.slice(startIndex, 10 + startIndex),
                  ..._messageContents,
                ])

                requestAnimationFrame(() => {
                  ref.current.scrollToRow(11)
                })
              }
            }}
          />
        )
      }}
    </AutoSizer>
  )
}
