import { useEffect, useRef, useState } from 'react'

type Dummy = {
  x: number
  y: number
}

const THROTTLE_MS = 50 // 20 updates per second

function App() {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const latest = useRef({ x: 0, y: 0 })
  const lastSent = useRef(0)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    fetch('/api/dummy')
      .then((res) => res.json())
      .then((data: Dummy) => {
        setX(data.x)
        setY(data.y)
        latest.current = { x: data.x, y: data.y }
      })

    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  const send = () => {
    const { x, y } = latest.current
    fetch('/api/dummy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ x, y }),
    })
    lastSent.current = Date.now()
    timer.current = null
  }

  const scheduleUpdate = (newX: number, newY: number) => {
    latest.current = { x: newX, y: newY }

    const elapsed = Date.now() - lastSent.current
    if (elapsed >= THROTTLE_MS) {
      if (timer.current) {
        clearTimeout(timer.current)
        timer.current = null
      }
      send()
    } else if (!timer.current) {
      timer.current = setTimeout(send, THROTTLE_MS - elapsed)
    }
  }

  const handleXChange = (value: number) => {
    setX(value)
    scheduleUpdate(value, latest.current.y)
  }

  const handleYChange = (value: number) => {
    setY(value)
    scheduleUpdate(latest.current.x, value)
  }

  return (
    <div className="panel">
      <div className="slider-group">
        <label htmlFor="x">X</label>
        <input
          id="x"
          type="range"
          min={-1}
          max={1}
          step={0.01}
          value={x}
          onChange={(e) => handleXChange(parseFloat(e.target.value))}
        />
      </div>
      <div className="slider-group">
        <label htmlFor="y">Y</label>
        <input
          id="y"
          type="range"
          min={-1}
          max={1}
          step={0.01}
          value={y}
          onChange={(e) => handleYChange(parseFloat(e.target.value))}
        />
      </div>
    </div>
  )
}

export default App
