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

function draw (
  container: HTMLDivElement, 
  options: {
    x: number,
    y: number,
    r: number,
    w: number,
    color: number
  }
) {
  const { x, y, w, r, color } = options
  const app = new PIXI.Application({ 
    width: 800,
    height: 200,
    antialias: true,
    backgroundColor: 0xffffff
  })
  container.appendChild(app.view)

  const graphics = new PIXI.Graphics()

  graphics.moveTo(x + r, y)
  graphics.lineStyle(w, color, 1)

  for (let i = 1; i < 8; i++) {
    const a = 2.6927937 * i
    graphics.lineTo(x + r * Math.cos(a), y + r * Math.sin(a))
  }

  graphics.drawCircle(248, 100 , 64)
  graphics.drawRect(348, 100 - 64, 128, 128)
  graphics.drawRoundedRect(508, 100 - 64, 128, 128, 16)

  graphics.closePath()

  app.stage.addChild(graphics)
}

export const PIXIPath: React.FC<IPIXIPath> = (props) => {

  const ref = useRef<HTMLDivElement>(null)
  const [perfs, set] = useState<{
    beginAt: number,
    endAt: number,
  } | null>(null)

  useEffect(() => {
    if (ref.current) {
      performance.mark('pixi:path')
      draw(ref.current, props)
      performance.mark('pixi:path')

      const perfs = performance.getEntriesByName('pixi:path')

      set({
        beginAt: perfs[0].startTime,
        endAt: perfs[1].startTime
      })
    }
  }, [])

  return (
    <div>
      <div ref={ref}></div>
      {
        perfs 
          ? <div>
            <p>pixi.js 路径渲染性能</p>
            <table>
              <thead>
                <tr>
                  <th>开始时间</th>
                  <th>结束时间</th>
                  <th>总耗时</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{Number(perfs.beginAt).toFixed(0)}</td>
                  <td>{Number(perfs.endAt).toFixed(0)}</td>
                  <td>{Number(perfs.endAt - perfs.beginAt).toFixed(0)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          : null
      }
    </div>
  )
}