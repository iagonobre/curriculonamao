import styles from './home.module.scss';

import { Header } from '../../components/Header';
import { Button } from '../../components/Button';

export default function HomeApp() {
  const haveCurriculum = false;

  return (
    <>

      {haveCurriculum ? (
        <div></div>
      ) : (<>
        <Header />
        <div className={styles.container}>
          <div className={styles.nothingContainer}>
            <div>
              <p>Você ainda não possui <br />um currículo</p>
              <img id="invert" src="/assets/homeapp.svg" alt="Vizinhança vazia" />
              <Button styleType="outline">CRIAR MEU CURRÍCULO</Button>
            </div>
          </div>
        </div>
      </>
      )}
    </>
  )
}