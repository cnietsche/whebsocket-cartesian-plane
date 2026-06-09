import { useEffect, useState } from 'react'
import CartesianPlane from './CartesianPlane'

type Dummy = {
  x: number
  y: number
}

function App() {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  useEffect(() => {
    fetch('/api/dummy')
      .then((res) => res.json())
      .then((data: Dummy) => {
        setX(data.x)
        setY(data.y)
      })

    let ws: WebSocket
    let reconnectTimer: ReturnType<typeof setTimeout>
    let active = true

    const connect = () => {
      const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:'
      ws = new WebSocket(`${protocol}//${location.host}/ws`)

      ws.onmessage = (event) => {
        const data: Dummy = JSON.parse(event.data)
        setX(data.x)
        setY(data.y)
      }

      ws.onclose = () => {
        if (active) {
          reconnectTimer = setTimeout(connect, 1000)
        }
      }
    }

    connect()

    return () => {
      active = false
      clearTimeout(reconnectTimer)
      ws.close()
    }
  }, [])

  return (
    <div className="panel">
      <CartesianPlane x={x} y={y} />
    </div>
  )
}

export default App
