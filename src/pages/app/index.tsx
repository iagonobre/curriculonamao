import styles from './home.module.scss';
import { useEffect, useState } from 'react';

import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { withSSRAuth } from '../../utils/withSSRAuth';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import { CvProps } from '../../dto/cvDTO';
import { parseCookies } from 'nookies';
import Link from 'next/link';
import { FiDownload, FiMoreHorizontal, FiPlusCircle, FiTrash } from 'react-icons/fi';
import { useRouter } from 'next/router';

export default function HomeApp() {
  const { refresh } = useAuth();
  const [cvs, setCvs] = useState<CvProps[]>([]);
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

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
      } catch (err) {
        setLoading(false)
      }
    }
    getCvs()
  }, [])

  async function handleDownloadCV(id: number) {
    setLoading(true)
    try {
      await refresh()
      const { '@cnm:token': token } = parseCookies();

      const downloadCV = await api.post('/cv/download', {
        cvID: id,
        theme: 'basic'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })

      push(`${process.env.NEXT_PUBLIC_API_URL}${downloadCV.data.uri}`)

      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  async function handleDeleteCV(id: number) {
    setLoading(true)
    try {
      await refresh()
      const { '@cnm:token': token } = parseCookies();

      await api.delete(`/cv/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      const cvs = await api.get('/cv', {
        headers: { Authorization: `Bearer ${token}` }
      })

      setCvs(cvs.data)
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      {loading ? (
        <div className={styles.container}>
          <div className={styles.nothingContainer}>
            <div >
              <p>Carregando...</p>
              <img id="invert" src="/assets/homeapp.svg" alt="Vizinhança vazia" />
            </div>
          </div>
        </div>
      ) : (
        cvs.length > 0 ? (
          <div className={styles.cvContainer}>
            <h3>Meus Currículos</h3>

            <div className={styles.cvGrid}>
              {cvs.map((cv) => {
                const date = new Date(cv.createdAt)
                return (
                  <button key={cv.id} className={styles.cv}>
                    <details>
                      <summary className={styles.dropdownTrigger}>
                        <FiMoreHorizontal size={28} />
                      </summary>

                      <div className={styles.dropdownContent}>
                        <div className={styles.dropUserContent}>
                          <p>{cv.title}</p>
                          <small>Feito por {cv.author.name}</small>
                          <small>Criado em {date.toLocaleDateString("pt-BR")}</small>
                        </div>

                        <div className={styles.line} />

                        <button onClick={() => handleDownloadCV(cv.id)}>
                          <FiDownload size={20} />
                          Baixar currículo
                        </button>
                        <button onClick={() => handleDeleteCV(cv.id)}>
                          <FiTrash size={20} />
                          Excluir
                        </button>
                      </div>
                    </details>
                    <img src="/assets/curriculum.png" alt="Currículo" />
                    <div className={styles.cvInfos}>
                      <p>{cv.title}</p>
                      <small>Criado em: {date.toLocaleDateString("pt-BR")}</small>
                    </div>
                  </button>
                )
              })}


              <Link href="/app/form" passHref>
                <button className={styles.cvAdd}>
                  <FiPlusCircle size={64} />
                </button>
              </Link>

            </div>
          </div>
        ) : (
          <div className={styles.container}>
            <div className={styles.nothingContainer}>
              <div>
                <p>Você ainda não possuí <br />um currículo.</p>
                <img id="invert" src="/assets/homeapp.svg" alt="Vizinhança vazia" />
                <Link href="/app/form" passHref>
                  <Button styleType="outline">CRIAR MEU CURRÍCULO</Button>
                </Link>
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