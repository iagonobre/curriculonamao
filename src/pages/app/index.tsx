import styles from './home.module.scss';

import { Header } from '../../components/Header';
import { Button } from '../../components/Button';

export default function HomeApp() {
  return (
    <>
      <Header />
      <div className={styles.nothingContainer}>
        <div>
          <p>Você ainda o possui <br />um currículo</p>
          <img src="/assets/homeapp.svg" alt="Vizinhança vazia" />
          <Button styleType="outline">CRIAR MEU CURRÍCULO</Button>
        </div>
      </div>
    </>
  )
}