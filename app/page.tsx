import { Metadata } from 'next'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'IMAPR | Home',
  description: 'INGENIERÍA MECÁNICA APLICADA DE POZA RICA S.A. DE C.V.',
}

const HomePage = () => {
  return (
    <div>
      <div className={styles.banner}>
        <h1 className={styles.bannerTitle}>IMAPR - Home</h1>
      </div>
    </div>
  )
}

export default HomePage