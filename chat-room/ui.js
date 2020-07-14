/*
 * @Author: Innei
 * @Date: 2020-05-23 20:11:29
 * @LastEditTime: 2020-05-23 20:56:47
 * @LastEditors: Innei
 * @FilePath: /playground/chat-room/ui.js
 * @Copyright
 */
import { render, h } from 'preact'
import { useState } from 'preact/hooks'
import { client } from './index'
import observable from './observable'
function App() {
  const [danmaku, setDanmaku] = useState([])
  const [value, setValue] = useState('')
  const [startTime] = useState(new Date())
  const handlePost = (e) => {
    // client.emit('DANMAKU_CREATE', value, (data) => console.log(data))
    client.emit('DANMAKU_CREATE', {
      content: value,
      path: '/',
      duringTime: 5,
      startTime: Math.floor(
        (new Date().getTime() - startTime.getTime()) / 1000,
      ),
    })
  }
  observable.on('e', (data) => {
    setDanmaku(data)
  })
  return (
    <div>
      <ul>
        {danmaku.map((d) => (
          <li>
            content: {d.content} time at: {d.startTime}
          </li>
        ))}
      </ul>

      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></input>
      <span>{value}</span>
      <button onClick={handlePost}>发送</button>
    </div>
  )
}

render(<App />, document.body)
