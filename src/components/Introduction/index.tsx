/*
 * @Author: Aniwei
 * @Date: 2022-10-18 15:22:37
 */
import styles from './index.module.scss'

interface IIntroduction {

}

export const Introduction: React.FC<IIntroduction> = () => {
  return (
    <section className={styles.introduction}>
      <h2>PIXI.js 与 Canvaskit </h2>
    </section>
  )
}