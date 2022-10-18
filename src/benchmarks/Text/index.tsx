
import styles from './index.module.scss'

import { CanvaskitText } from './CanvaskitText'
import { PIXIText } from './PIXIText'

interface IText {

}

export const Text: React.FC<IText> = () => {
  return (
    <section>
      <h2>文字渲染</h2>
      <h3>pixi.js</h3>
      <div>
        <PIXIText 
          texts="🌞 The world is yours, and it's ours, but at it's root it's theirs"
        />
      </div>

      <h3>canvaskit-wasm</h3>
      <div>
        <CanvaskitText 
          texts="🌞 The world is yours, and it's ours, but at it's root it's theirs"
        />
      </div>
      
    </section>
  )
}