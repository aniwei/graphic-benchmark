/*
 * @Author: Aniwei
 * @Date: 2022-10-19 10:15:50
 */
import * as PIXI from 'pixi.js'
import { useEffect, useState, useRef } from 'react'

interface IPIXIImage {
}

function arrayBufferToBase64 (data: ArrayBuffer) {
  let binary = ''
  const bytes = new Uint8Array(data)
  const len = bytes.byteLength
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return window.btoa(binary)
}

export const PIXIImage: React.FC<IPIXIImage> = (props) => {
  const ref = useRef<HTMLDivElement>(null)
  const [perfs, set] = useState<{
    beginAt: number,
    endAt: number,
  } | null>(null)

  useEffect(() => {
    if (ref.current) {
      const app = new PIXI.Application({ 
        width: 800,
        height: 800,
        antialias: true,
      })

      Promise.all([
        `/assets/image1.jpeg`,
        `/assets/image2.jpeg`
      ].map(url => {
        return fetch(url).then(resp => resp.arrayBuffer())
      })).then((images: ArrayBuffer[]) => {
        performance.mark('pixi:image')

        const app = new PIXI.Application({ 
          width: 800,
          height: 800,
          antialias: true,
        })

        ref.current!.appendChild(app.view)
       
        const image = new Image()
        image.src = 'data:image/jpeg;base64,' + arrayBufferToBase64(images[0])
        const sprite = PIXI.Sprite.from(image)
      
        app.stage.addChild(sprite)

        const image1 = new Image()
        image1.src = 'data:image/jpeg;base64,' + arrayBufferToBase64(images[1])
        const sprite1 = PIXI.Sprite.from(image1)

        sprite1.x = 100
        sprite1.y = 100
      
        app.stage.addChild(sprite1)

        performance.mark('pixi:image')
        const perfs = performance.getEntriesByName('pixi:image')

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
            <p>pixi.js 图片渲染性能</p>
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