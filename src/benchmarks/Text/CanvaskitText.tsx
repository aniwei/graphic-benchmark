/*
 * @Author: Aniwei
 * @Date: 2022-10-18 19:21:26
 */
import CanvasKitInit, { Canvas, CanvasKit, Surface } from 'canvaskit-wasm'
import { useEffect, useState, useRef } from 'react'

interface ICanvaskitText {
  texts: string
}

export const CanvaskitText: React.FC<ICanvaskitText> = (props) => {
  const { texts } = props
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
          `/assets/NotoColorEmoji.ttf`,
          `/assets/Roboto-Regular.ttf`
        ].map(url => {
          return fetch(url).then(resp => resp.arrayBuffer())
        })).then((fonts: ArrayBuffer[]) => {
          performance.mark('canvaskit:text')

          const surface = CanvasKit.MakeWebGLCanvasSurface(ref.current as HTMLCanvasElement)
          const canvas = surface!.getCanvas()
          canvas.clear(CanvasKit.Color(0, 0, 0, 0.0))
          const fontMgr = CanvasKit.FontMgr.FromData(...fonts)

          const paint = new CanvasKit.Paint()
          paint.setStyle(CanvasKit.PaintStyle.Fill)
          paint.setAntiAlias(true)

          const builder1 = CanvasKit.ParagraphBuilder.Make(new CanvasKit.ParagraphStyle({
            textStyle: {
              color: CanvasKit.BLACK,
              fontFamilies: ['Roboto', 'Noto Color Emoji'],
              fontSize: 24,
            },
            textAlign: CanvasKit.TextAlign.Left,
            maxLines: 2,
            ellipsis: '...',
          }), fontMgr!)

          builder1.addText(texts)
          const paragraph1 = builder1.build()

          const wrap = 350
          paragraph1.layout(wrap)
          canvas.drawParagraph(paragraph1, 0, 0)

          const builder2 = CanvasKit.ParagraphBuilder.Make(new CanvasKit.ParagraphStyle({
            textStyle: {
              color: CanvasKit.BLUE,
              fontFamilies: ['Roboto', 'Noto Color Emoji'],
              fontSize: 30,
            },
            textAlign: CanvasKit.TextAlign.Left,
          }), fontMgr!)

          builder2.addText(texts) 
          const paragraph2 = builder2.build()

          const wrap2 = 600
          paragraph2.layout(wrap2)

          
          canvas.drawParagraph(paragraph2, 0, 120)

          const builder3 = CanvasKit.ParagraphBuilder.Make(new CanvasKit.ParagraphStyle({
            textStyle: {
              color: CanvasKit.parseColorString(`#00ff00`),
              fontFamilies: ['Roboto', 'Noto Color Emoji'],
              fontSize: 30,
            },
            textAlign: CanvasKit.TextAlign.Left,
          }), fontMgr!)

          builder3.addText(texts + '🎉') 
          const paragraph3 = builder3.build()

          const wrap3 = 800
          paragraph3.layout(wrap3)

          canvas.drawParagraph(paragraph3, 0, 240)

          surface?.flush()
          
          performance.mark('canvaskit:text')
          const perfs = performance.getEntriesByName('canvaskit:text')
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
      <canvas width={800} height={500} ref={ref}></canvas>
      {
        perfs 
          ? <div>
            <p>canvaskit-wasm 文字渲染性能</p>
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