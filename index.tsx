import * as React from 'react'
import ReactDom from 'react-dom'

import { DynamicList } from './components/vlist'
import './index.scss'
const App = () => {
  return (
    <React.Fragment>
      <desc>
        <p>React virtualized library Demo</p>
        <p>A simple message list with dynamic height.</p>
        <p>Message with random image and random text.</p>
        <p>Scroll to Top and load more messages.</p>
      </desc>

      <div className="container">
        <DynamicList />
      </div>
    </React.Fragment>
  )
}

ReactDom.render(<App />, document.getElementById('app'))
