import styles from './home.module.scss';
import { useEffect, useState } from 'react';

import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { withSSRAuth } from '../../utils/withSSRAuth';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import { CvProps } from '../../dto/cvDTO';
import { parseCookies } from 'nookies';

export default function HomeApp() {
  const { refresh } = useAuth();
  const [cvs, setCvs] = useState<CvProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getCvs() {
      setLoading(true)
      try {
        await refresh()
        const { '@cnm:token': token } = parseCookies();

        const cvs = await api.get('/cv', {
          headers: { Authorization: `Bearer ${token}` }
        })

        setCvs(cvs.data)
        setLoading(false)
        console.log(cvs)
      } catch (err) {
        console.log(err)
        setLoading(false)
      }
    }
    getCvs()
  }, [])

  return (
    <>
      <Header />
      {loading ? (
        <div className={styles.container}>
          <div className={styles.nothingContainer}>
            <div>
              <p>Carregando...</p>
              <img id="invert" src="/assets/homeapp.svg" alt="Vizinhança vazia" />
            </div>
          </div>
        </div>
      ) : (
        cvs.length > 0 ? (
          <div className={styles.container}></div>
        ) : (
          <div className={styles.container}>
            <div className={styles.nothingContainer}>
              <div>
                <p>Você ainda não possuí <br />um currículo.</p>
                <img id="invert" src="/assets/homeapp.svg" alt="Vizinhança vazia" />
                <Button styleType="outline">CRIAR MEU CURRÍCULO</Button>
              </div>
            </div>
          </div>
        ))
      }
    </>
  )
}

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {}
  }
});