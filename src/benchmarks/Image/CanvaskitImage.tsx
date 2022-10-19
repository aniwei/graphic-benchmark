/*
 * @Author: Aniwei
 * @Date: 2022-10-19 10:15:50
 */
import CanvasKitInit, { Canvas, CanvasKit, Surface } from 'canvaskit-wasm'
import { useEffect, useState, useRef } from 'react'

interface ICanvaskitImage {
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
          return `/assets/canvaskit.wasm`
        },
      }).then(CanvasKit => {
        Promise.all([
          `/assets/image1.jpeg`,
          `/assets/image2.jpeg`
        ].map(url => {
          return fetch(url).then(resp => resp.arrayBuffer())
        })).then((images: ArrayBuffer[]) => {
          performance.mark('canvaskit:image')
          const surface = CanvasKit.MakeWebGLCanvasSurface(ref.current as HTMLCanvasElement)
          const canvas = surface!.getCanvas()
          canvas.clear(CanvasKit.Color(255, 255, 255, 1))
  
          const image1 = CanvasKit.MakeImageFromEncoded(images[0])
          const image2 = CanvasKit.MakeImageFromEncoded(images[1])
          canvas.drawImage(image1!, 0, 0)
          canvas.drawImage(image2!, 100, 100)

          surface!.flush()
  
          performance.mark('canvaskit:image')
          const perfs = performance.getEntriesByName('canvaskit:image')
  
          set({
            beginAt: perfs[0].startTime,
            endAt: perfs[1].startTime
          })
        })

      })
    }
  }, [])

  return (
    <div>
      <canvas width={800} height={800} ref={ref}></canvas>
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