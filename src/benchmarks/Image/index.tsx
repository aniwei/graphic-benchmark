/*
 * @Author: Aniwei
 * @Date: 2022-10-18 19:19:04
 */
import { CanvaskitImage } from './CanvaskitImage'
import { PIXIImage } from './PIXIImage'

export const Image = () => {
  return (
    <section>
      <h2>图片渲染</h2>
      <h3>pixi.js</h3>
      <div>
        <PIXIImage />
      </div>
      <h3>canvaskit-wasm</h3>
      <div>
        <CanvaskitImage />
      </div>
    </section>
  )
}