/*
 * @Author: Innei
 * @Date: 2021-02-25 12:26:13
 * @LastEditTime: 2021-03-01 20:41:29
 * @LastEditors: Innei
 * @FilePath: /RTableView/src/App.tsx
 * @Mark: Coding with Love
 */
import * as React from 'react'
import logo from './logo.svg'
import './App.css'
import { RTableView } from './components/RTableView'
import { RTableCell } from './components/RTableView/cell'
import { CellContentDataType } from './components/RTableView/types'
import { List } from 'react-virtualized'
import { Separator } from './components/separator'

const mock = [
  {
    title: 'Velvet Natera',
    desc:
      'Vivamus ac suscipit est, et elementum lectus. Nam aliquet purus quis massa eleifend, et efficitur felis aliquam. Ut tristique augue at congue molestie. Vivamus ac suscipit est, et elementum lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    title: 'Velvet Natera',
    desc:
      'Aliquam erat volutpat. Vestibulum a eros accumsan, lacinia eros non, pretium diam. Donec tempus, augue id hendrerit pretium, mauris leo congue nulla, ac iaculis erat nunc in dolor. Cras tempus ac dolor ut convallis. Vivamus commodo odio metus, tincidunt facilisis augue dictum quis. Cras eget enim nec odio feugiat tristique eu quis ante. Etiam ac accumsan elit, et pharetra ex. Duis mi massa, feugiat nec molestie sit amet, suscipit et metus. Aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
]

const _data: CellContentDataType[] = Array.from({ length: 20 }, (_, i) => ({
  textLabel: { text: mock[i % mock.length].title },
  detailLabel: { text: mock[i % mock.length].desc },
}))
function App() {
  const [data, setData] = React.useState(_data)
  const ref = React.useRef<List>(null)
  const [row, setRow] = React.useState('0')
  const [cellRenderAnimation, setCellRenderAnimation] = React.useState(true)
  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <header className="navigation-item">
        <nav>UIKIt UITableView implementation</nav>
        <Separator />
      </header>
      <div
        style={{
          padding: '0 0 1em 0',
          height: '70vh',
        }}
      >
        <RTableView
          onPullToRefresh={() => {
            alert('Do refresh')
          }}
          didSelectRowAt={(i) => {
            alert('Select Col At ' + i)
          }}
          ref={ref}
          data={data}
          cellProps={{
            accessoryType: RTableCell.CellAccessoryType.disclosureIndicator,
            cellRenderAnimation: cellRenderAnimation,
          }}
          onLoadMore={async () => {
            setData(data.concat([..._data]))
          }}
        />
      </div>
      <div className="actions">
        <p>
          Current Row Count: {data.length}, Cell Animation:{' '}
          {cellRenderAnimation ? 'On' : 'Off'}
        </p>

        <p>
          <button
            onClick={() => {
              const tmp: any[] = []
              for (let i = 0; i < Math.floor(100000 / _data.length); i++) {
                tmp.push(..._data)
              }

              setData(data.concat(tmp))
            }}
          >
            Add 100000 Rows
          </button>

          <button
            onClick={() => {
              setData(data.slice(0, 100))
            }}
          >
            Remove Only 100 Rows
          </button>

          <button
            onClick={() => {
              setCellRenderAnimation(!cellRenderAnimation)
            }}
          >
            Toggle Cell Animation
          </button>
        </p>
        <div className="">
          <input
            type="text"
            value={row}
            onChange={(e) => {
              setRow(e.target.value)
            }}
          />
          <button
            style={{ fontSize: '1em', marginLeft: '12px' }}
            onClick={() => {
              ref.current?.scrollToRow(~~row)
            }}
          >
            Scroll To
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
