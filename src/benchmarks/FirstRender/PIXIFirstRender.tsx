/*
 * @Author: Aniwei
 * @Date: 2022-10-19 10:15:50
 */
import * as PIXI from 'pixi.js'
import CanvasKitInit, { Canvas, CanvasKit, Surface } from 'canvaskit-wasm'
import { useEffect, useState, useRef } from 'react'
import { AnimationManager } from 'lottie-pixi'

function arrayBufferToBase64 (data: ArrayBuffer) {
  let binary = ''
  const bytes = new Uint8Array(data)
  const len = bytes.byteLength
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return window.btoa(binary)
}

interface IPIXIFirstRender {
}

export const PIXIFirstRender: React.FC<IPIXIFirstRender> = (props) => {
  const ref = useRef<HTMLDivElement>(null)
  const [perfs, set] = useState<{
    beginAt: number,
    endAt: number,
  } | null>(null)


  useEffect(() => {
    if (ref.current) {
      Promise.all([
        `/assets/image2.jpeg`,
        `/assets/Roboto-Regular.ttf`,
      ].map(url => {
        return fetch(url).then(resp => resp.arrayBuffer())
      })).then(data => {
        performance.mark('pixi:first')
        const app = new PIXI.Application({ 
          width: 500,
          height: 500,
          antialias: true,
        })

        ref.current!.appendChild(app.view)

        const image = new Image()
        image.src = 'data:image/jpeg;base64,' + arrayBufferToBase64(data[0])
        const sprite = PIXI.Sprite.from(image)
      
        app.stage.addChild(sprite)

        const basic = new PIXI.Text(`Skia now offers a WebAssembly build for easy deployment of our graphics APIs on the web.`, new PIXI.TextStyle({
          fontFamily: ['Roboto', 'Noto Color Emoji'],
          fontSize: 20,
          fill: 0xffffff,
          wordWrap: true,
          wordWrapWidth: 600,
          lineJoin: 'round',
        }))
  
        basic.x = 0
        basic.y = 100

        app.stage.addChild(basic)

        const graphics1 = new PIXI.Graphics()
        graphics1.beginFill(0x000000)
        graphics1.drawCircle(250, 250 , 50)
        graphics1.endFill()

        app.stage.addChild(graphics1)

        const graphics2 = new PIXI.Graphics()
        graphics2.lineStyle(4, 0xff00ff, 1)
        graphics2.drawRoundedRect(50, 200, 100, 100, 10)

        app.stage.addChild(graphics2)

        performance.mark('pixi:first')
        
        const perfs = performance.getEntriesByName('pixi:first')
        set({
          beginAt: perfs[0].startTime,
          endAt: perfs[1].startTime
        })
      })
    }
  }, [])

  return (
    <div>
      <div ref={ref}></div>
      {
        perfs 
          ? <div>
            <p>pixi.js 首次渲染性能</p>
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