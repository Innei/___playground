/*
 * @Author: Innei
 * @Date: 2020-05-23 20:07:20
 * @LastEditTime: 2020-05-23 20:10:11
 * @LastEditors: Innei
 * @FilePath: /playground/chat-room/index.js
 * @Copyright
 */
// @ts-check
import io from 'socket.io-client'

const client = io('http://127.0.0.1:2333/web')
import observable from './observable'

client.on('connect', () => {
  console.log('connect')
})

client.on('message', ({ type, data }) => {
  switch (type) {
    case 'DANMAKU_CREATE': {
      observable.emit('e', data)
    }
  }
})

export { client }
