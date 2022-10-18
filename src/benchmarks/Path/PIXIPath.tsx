/*
 * @Author: Aniwei
 * @Date: 2022-10-18 20:39:13
 */
import * as PIXI from 'pixi.js'
import { useEffect, useRef, useState } from 'react'

interface IPIXIPath {
  x: number,
  y: number,
  r: number,
  w: number,
  color: number
}

export const PIXIPath: React.FC<IPIXIPath> = (props) => {
  const { x, y, r, w, color } = props

  const ref = useRef<HTMLDivElement>(null)
  const [perfs, set] = useState<{
    beginAt: number,
    endAt: number,
  } | null>(null)

  useEffect(() => {
    if (ref.current) {
      const app = new PIXI.Application({ 
        width: 200,
        height: 200,
        antialias: true,
        backgroundColor: 0xffffff
      })
      ref.current.appendChild(app.view)

      const graphics = new PIXI.Graphics()

      
      graphics.moveTo(x + r, y)

      for (let i = 1; i < 8; i++) {
        const a = 2.6927937 * i
        graphics.lineTo(x + r * Math.cos(a), y + r * Math.sin(a))
      }

      graphics.lineStyle(w, color, 1)
      graphics.closePath()
    
      app.stage.addChild(graphics)
    }
  }, [])

  return (
    <div>
      <div ref={ref}></div>
    </div>
  )
}