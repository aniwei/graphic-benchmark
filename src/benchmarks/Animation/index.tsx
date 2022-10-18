/*
 * @Author: Aniwei
 * @Date: 2022-10-18 19:19:04
 */
import { CanvaskitAnimation } from './CanvaskitAnimation'
import drinks from './drinks.json'

export const Animation = () => {
  return (
    <section>
      <h2>图片渲染</h2>
      <h3>pixi.js</h3>
      <div>
       
      </div>
      <h3>canvaskit-wasm</h3>
      <div>
        <CanvaskitAnimation 
          animations={JSON.stringify(drinks)}
        />
      </div>
    </section>
  )
}