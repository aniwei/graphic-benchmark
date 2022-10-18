/*
 * @Author: Aniwei
 * @Date: 2022-10-18 19:21:26
 */
import CanvasKitInit, { Canvas, CanvasKit, Surface } from 'canvaskit-wasm'
import { useEffect, useState, useRef } from 'react'

interface ICanvaskitPath {
  x: number,
  y: number,
  r: number,
  w: number,
  color: string
}

function draw (
  CanvasKit: CanvasKit,
  surface: Surface,
  canvas: Canvas,
  star: {
    x: number,
    y: number,
    r: number,
    w: number,
    color: string
  }
) {  
  const { x, y, w, r, color } = star
  const paint = new CanvasKit.Paint()
  const c = CanvasKit.parseColorString(color)

  const path = new CanvasKit.Path()
  path.moveTo(x + r, y)
  for (let i = 1; i < 8; i++) {
    const a = 2.6927937 * i
    path.lineTo(x + r * Math.cos(a), y + r * Math.sin(a))
  }

  paint.setStyle(CanvasKit.PaintStyle.Stroke);
  paint.setStrokeWidth(w)
  paint.setAntiAlias(true)
  paint.setColor(c)

  canvas.drawCircle(248, 100, 64, paint)
  canvas.drawRect(CanvasKit.XYWHRect(348, 100 - 64, 128, 128), paint)
  canvas.drawRRect(CanvasKit.RRectXY(
    CanvasKit.XYWHRect(508, 100 - 64, 128, 128),
    16,
    16
  ), paint)

  canvas.drawPath(path, paint)

  path.delete()
  surface!.flush()
}

export const CanvaskitPath: React.FC<ICanvaskitPath> = (props) => {
  const ref = useRef<HTMLCanvasElement>(null)
  const [perfs, set] = useState<{
    beginAt: number,
    endAt: number,
  } | null>(null)

  useEffect(() => {
    if (ref.current) {
      CanvasKitInit({
        locateFile (file: string) {
          return `http://localhost:5173/assets/canvaskit.wasm`
        },
      }).then(CanvasKit => {
        performance.mark('canvaskit:path')
        const surface = CanvasKit.MakeWebGLCanvasSurface(ref.current as HTMLCanvasElement)
        const canvas = surface!.getCanvas()
        canvas.clear(CanvasKit.Color(0, 0, 0, 0.0))
        draw(CanvasKit, surface!, canvas, props)
        performance.mark('canvaskit:path')
        const perfs = performance.getEntriesByName('canvaskit:path')

        set({
          beginAt: perfs[0].startTime,
          endAt: perfs[1].startTime
        })
      })
    }
  }, [])

  return (
    <div>
      <canvas width={800} height={200} ref={ref}></canvas>
      {
        perfs 
          ? <div>
            <p>canvaskit-wasm 路径渲染性能</p>
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