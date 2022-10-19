/*
 * @Author: Aniwei
 * @Date: 2022-10-18 19:19:04
 */
import { CanvaskitAnimation } from './CanvaskitAnimation'
import { PIXIAnimation } from './PIXIAnimation'
import drinks from './drinks.json'

export const Animation = () => {
  return (
    <section>
      <h2>动画渲染</h2>
      <h3>pixi.js</h3>
      <div>
        <PIXIAnimation 
          animations={JSON.stringify(drinks)}
        />
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