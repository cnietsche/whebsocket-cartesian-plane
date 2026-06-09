const SIZE = 400
const PADDING = 40
const PLOT_SIZE = SIZE - 2 * PADDING
const TICKS = [-1, -0.5, 0, 0.5, 1]

type Props = {
  x: number
  y: number
}

function toVisual(value: number, axis: 'x' | 'y'): number {
  const normalized = (value + 1) / 2
  if (axis === 'x') {
    return PADDING + normalized * PLOT_SIZE
  }
  return PADDING + (1 - normalized) * PLOT_SIZE
}

function CartesianPlane({ x, y }: Props) {
  const originX = toVisual(0, 'x')
  const originY = toVisual(0, 'y')
  const pointX = toVisual(x, 'x')
  const pointY = toVisual(y, 'y')

  return (
    <svg width={SIZE} height={SIZE} className="plane">
      <line
        x1={PADDING}
        y1={originY}
        x2={SIZE - PADDING}
        y2={originY}
        stroke="#333"
        strokeWidth={1}
      />
      <line
        x1={originX}
        y1={PADDING}
        x2={originX}
        y2={SIZE - PADDING}
        stroke="#333"
        strokeWidth={1}
      />

      {TICKS.map((tick) => {
        const tickX = toVisual(tick, 'x')
        const tickY = toVisual(tick, 'y')
        return (
          <g key={tick}>
            <line
              x1={tickX}
              y1={originY - 4}
              x2={tickX}
              y2={originY + 4}
              stroke="#666"
              strokeWidth={1}
            />
            <text x={tickX} y={originY + 16} textAnchor="middle" fontSize={10} fill="#666">
              {tick}
            </text>
            <line
              x1={originX - 4}
              y1={tickY}
              x2={originX + 4}
              y2={tickY}
              stroke="#666"
              strokeWidth={1}
            />
            <text x={originX - 12} y={tickY + 4} textAnchor="end" fontSize={10} fill="#666">
              {tick}
            </text>
          </g>
        )
      })}

      <circle cx={pointX} cy={pointY} r={6} fill="red" />
    </svg>
  )
}

export default CartesianPlane
