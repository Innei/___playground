/*
 * @Author: Innei
 * @Date: 2021-03-01 20:50:07
 * @LastEditTime: 2021-03-01 20:50:38
 * @LastEditors: Innei
 * @FilePath: /RTableView/src/utils/observable.ts
 * @Mark: Coding with Love
 */

interface Observer {
  id: string
  callback: Function
}
export class Observable {
  observers: Observer[] = []

  on(event: string, handler: (...rest: any) => void) {
    const isExist = this.observers.some(({ id, callback }) => {
      if (id === event && handler === callback) {
        return true
      }
      return false
    })
    if (!isExist) {
      this.observers.push({
        id: event,
        callback: handler,
      })
    }
  }

  emit(event: string, payload?: any) {
    this.observers.map(({ id, callback }) => {
      if (id === event) {
        callback.call(this, payload)
      }
    })
  }

  off(event: string, handler?: (...rest: any) => void) {
    if (handler) {
      const index = this.observers.findIndex(({ id, callback }) => {
        return id === event && callback === handler
      })
      if (index !== -1) {
        this.observers.splice(index, 1)
      }
    } else {
      const observers = [] as Observer[]
      this.observers.map((observer) => {
        if (observer.id !== event) {
          observers.push(observer)
        }
      })

      this.observers = observers
    }
  }
}

export default new Observable()
