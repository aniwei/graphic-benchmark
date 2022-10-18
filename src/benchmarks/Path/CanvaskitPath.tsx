/*
 * @Author: Aniwei
 * @Date: 2022-10-18 19:21:26
 */
import CanvasKitInit from 'canvaskit-wasm'
import { useEffect, useState, useRef } from 'react'

interface ICanvaskitPath {
  x: number,
  y: number,
  r: number,
  w: number,
  color: number[]
}

export const CanvaskitPath: React.FC<ICanvaskitPath> = (props) => {
  const { x, y, r, w, color } = props
  const ref = useRef<HTMLCanvasElement>(null)
  const [perfs, set] = useState<{
    beginAt: number,
    endAt: number,
  } | null>(null)

  useEffect(() => {
    if (ref.current) {
      CanvasKitInit({
        locateFile (file: string) {
          return `http://localhost:5173/bin/canvaskit.wasm`
        },
      }).then(CanvasKit => {
        performance.mark('canvaskit:path')
        const surface = CanvasKit.MakeWebGLCanvasSurface(ref.current as HTMLCanvasElement)
        const canvas = surface!.getCanvas()
        const paint = new CanvasKit.Paint()

        const color = CanvasKit.parseColorString(`#4746cd`)

        const path = new CanvasKit.Path()
        path.moveTo(x + r, y)
        for (let i = 1; i < 8; i++) {
          const a = 2.6927937 * i
          path.lineTo(x + r * Math.cos(a), y + r * Math.sin(a))
        }

        // const dpe = CanvasKit.PathEffect.MakeDash([15, 5, 5, 10], 0)
        // paint.setPathEffect(dpe)

        paint.setStyle(CanvasKit.PaintStyle.Stroke);
        paint.setStrokeWidth(w)
        paint.setAntiAlias(true)
        paint.setColor(color)

        canvas.clear(CanvasKit.Color(0, 0, 0, 0.0))
        canvas.drawPath(path, paint)
        surface!.flush()
        performance.mark('canvaskit:path')

        // dpe.delete()
        path.delete()

        const perfs = performance.getEntriesByName(`canvaskit:path`)
        
        set({
          beginAt: perfs[0].startTime,
          endAt: perfs[1].startTime
        })
      })
    }
  }, [])

  return (
    <div>
      <canvas width={200} height={200} ref={ref}></canvas>
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