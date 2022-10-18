/*
 * @Author: Aniwei
 * @Date: 2022-10-17 19:30:52
 */
import { useState } from 'react'

import { Introduction } from '@components/Introduction'
import { BaseComparison } from '@components/BaseComparison'
import { MatureSolution } from '@components/MatureSolution'

import { Startup } from '@benchmarks/Startup'
import { FirstRender } from '@benchmarks/FirstRender'
import { Path } from '@benchmarks/Path'
import { Text } from '@benchmarks/Text'

import styles from './index.module.scss'

function App() {
  return (
    <div className={styles.app}>
      <Introduction />
      <BaseComparison />
      <Startup />
      <FirstRender />
      <Path />
      <Text />
      <MatureSolution />
    </div>
  )
}

export default App
