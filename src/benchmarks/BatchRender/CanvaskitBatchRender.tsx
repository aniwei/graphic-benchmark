/*
 * @Author: Aniwei
 * @Date: 2022-10-19 10:15:50
 */
import CanvasKitInit, { Canvas, CanvasKit, Surface } from 'canvaskit-wasm'
import { useEffect, useState, useRef } from 'react'

interface ICanvaskitBatchRender {
}


export const CanvaskitBatchRender: React.FC<ICanvaskitBatchRender> = (props) => {
  const ref = useRef<HTMLCanvasElement>(null)
  const [perfs, set] = useState<{
    beginAt: number,
    endAt: number,
  } | null>(null)

  useEffect(() => {
    if (ref.current) {
      Promise.all([
        `/assets/Roboto-Regular.ttf`
      ].map(url => {
        return fetch(url).then(resp => resp.arrayBuffer())
      })).then(data => {
        CanvasKitInit({
          locateFile (file: string) {
            return `/assets/canvaskit.wasm`
          },
        }).then(CanvasKit => {
          performance.mark('canvaskit:batch')
          const surface = CanvasKit.MakeWebGLCanvasSurface(ref.current as HTMLCanvasElement)
          const canvas = surface!.getCanvas()
          canvas.clear(CanvasKit.Color(0, 0, 0, 0.0))
          const fontMgr = CanvasKit.FontMgr.FromData(data[0])
  
          let c = 0
          let r = 0
          
          for (let i = 0; i < 5000; i++) {
            const builder1 = CanvasKit.ParagraphBuilder.Make(new CanvasKit.ParagraphStyle({
              textStyle: {
                color: CanvasKit.BLACK,
                fontFamilies: ['Roboto'],
                fontSize: 12,
              },
              textAlign: CanvasKit.TextAlign.Left,
              maxLines: 2,
              ellipsis: '...',
            }), fontMgr!)
            builder1.addText(`O2 Lab`)
            const paragraph1 = builder1.build()

            const wrap = 350
            paragraph1.layout(wrap)
            canvas.drawParagraph(paragraph1, c * 50, r * 12)

            builder1.delete()
            paragraph1.delete()

            r++
            if ((i + 1) % 32 === 0) {
              c++
              r = 0
            }
          }

          surface?.flush()
          performance.mark('canvaskit:batch')

          const perfs = performance.getEntriesByName('canvaskit:batch')
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
      <canvas width={800} height={400} ref={ref}></canvas>
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