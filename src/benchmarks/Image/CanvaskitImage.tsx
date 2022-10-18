import CanvasKitInit, { Canvas, CanvasKit, Surface } from 'canvaskit-wasm'
import { useEffect, useState, useRef } from 'react'

interface ICanvaskitImage {
}

function drawImage () {

}

export const CanvaskitImage: React.FC<ICanvaskitImage> = (props) => {
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
        performance.mark('canvaskit:image')
        const surface = CanvasKit.MakeWebGLCanvasSurface(ref.current as HTMLCanvasElement)
        const canvas = surface!.getCanvas()
        canvas.clear(CanvasKit.Color(255, 255, 255, 1))

        performance.mark('canvaskit:image')
        const perfs = performance.getEntriesByName('canvaskit:image')

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