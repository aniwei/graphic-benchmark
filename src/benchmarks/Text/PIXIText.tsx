/*
 * @Author: Aniwei
 * @Date: 2022-10-18 17:37:46
 */
import { useEffect, useRef } from 'react'
import PIXI from 'pixi.js'

export const PIXIText = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      const app = new PIXI.Application({ backgroundColor: 0x1099bb })
      ref.current.appendChild(app.view)
      
      const basic = new PIXI.Text('O2 Lab 来自京东零售集团，创建于2015年10月，是一个专注于用户体验及产品价值提升的产品研发团队。')
      basic.x = 50
      basic.y = 100

      app.stage.addChild(basic)

      const rich = new PIXI.Text('O2 Lab 来自京东零售集团，创建于2015年10月，是一个专注于用户体验及产品价值提升的产品研发团队。', new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 36,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', '#00ff99'], 
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440,
        lineJoin: 'round',
      }))

      rich.x = 50
      rich.y = 220

      app.stage.addChild(rich)      

      const skew = new PIXI.Text('O2 Lab 来自京东零售集团，创建于2015年10月，是一个专注于用户体验及产品价值提升的产品研发团队。', )
      skew.skew.set(0.65, -0.3)
      skew.anchor.set(0.5, 0.5)
      skew.x = 50
      skew.y = 480

      app.stage.addChild(skew)
    }
  }, [])

  return (
    <div ref={ref}>

    </div>
  )
}