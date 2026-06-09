import { useEffect, useState } from 'react'

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
  }, [])

  const update = (newX: number, newY: number) => {
    fetch('/api/dummy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ x: newX, y: newY }),
    })
  }

  const handleXChange = (value: number) => {
    setX(value)
    update(value, y)
  }

  const handleYChange = (value: number) => {
    setY(value)
    update(x, value)
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
