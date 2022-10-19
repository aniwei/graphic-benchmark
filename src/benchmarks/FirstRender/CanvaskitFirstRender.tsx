/*
 * @Author: Aniwei
 * @Date: 2022-10-18 19:21:26
 */
import CanvasKitInit from 'canvaskit-wasm'
import { useEffect, useState, useRef } from 'react'

interface ICanvaskitFirstRender {

}

export const CanvaskitFirstRender: React.FC<ICanvaskitFirstRender> = () => {
  const ref = useRef<HTMLCanvasElement>(null)
  const [perfs, set] = useState<{
    beginAt: number,
    endAt: number
  } | null>(null)

  useEffect(() => {
    CanvasKitInit({
      locateFile (file: string) {
        return `/assets/canvaskit.wasm`
      },
    }).then(CanvasKit => {
      Promise.all([
        `/assets/image2.jpeg`,
        `/assets/Roboto-Regular.ttf`,
      ].map(url => {
        return fetch(url).then(resp => resp.arrayBuffer())
      })).then(data => {
        performance.mark('canvaskit-wasm:first')

        const surface = CanvasKit.MakeWebGLCanvasSurface(ref.current as HTMLCanvasElement)
        const canvas = surface!.getCanvas()
        canvas.clear(CanvasKit.Color(255, 255, 255, 1))

        // image
        const image1 = CanvasKit.MakeImageFromEncoded(data[0])
        canvas.drawImage(image1!, 0, 0)

        // text
        const fontMgr = CanvasKit.FontMgr.FromData(data[1])
        const paint = new CanvasKit.Paint()
        paint.setStyle(CanvasKit.PaintStyle.Fill)
        paint.setAntiAlias(true)

        const builder1 = CanvasKit.ParagraphBuilder.Make(new CanvasKit.ParagraphStyle({
          textStyle: {
            color: CanvasKit.WHITE,
            fontFamilies: ['Roboto', 'Noto Color Emoji'],
            fontSize: 20,
          },
          textAlign: CanvasKit.TextAlign.Left,
          maxLines: 1,
        }), fontMgr!)

        builder1.addText(`Skia now offers a WebAssembly build for easy deployment of our graphics APIs on the web.`)
        const paragraph1 = builder1.build()

        const wrap = 600
        paragraph1.layout(wrap)

        canvas.drawParagraph(paragraph1, 0, 100)
        
        canvas.drawCircle(250, 250, 50, paint)

        const paint1 = new CanvasKit.Paint()
        paint1.setStyle(CanvasKit.PaintStyle.Stroke)
        paint1.setStrokeWidth(4)
        paint1.setColor(CanvasKit.parseColorString(`#ff00ff`))

        canvas.drawRRect(CanvasKit.RRectXY(
          CanvasKit.XYWHRect(50, 200, 100, 100),
          10,
          10
        ), paint1)

        surface!.flush()

        paint.delete()

        performance.mark('canvaskit-wasm:first')
        const perfs = performance.getEntriesByName(`canvaskit-wasm:first`)

        set({
          beginAt: perfs[0].startTime,
          endAt: perfs[1].startTime
        })
      })


    })
  }, [])

  return (
    <div>
      <canvas width={500} height={500} ref={ref}></canvas>
      {
        perfs 
          ? <div>
            <p>canvaskit-wasm 首次渲染性能</p>
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
          : <div style={{ display: 'flex', minHeight: '100px', alignItems: 'center' }}>请等待</div>
      }
    </div>
  )
}