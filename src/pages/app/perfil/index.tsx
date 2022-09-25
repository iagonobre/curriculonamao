import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { AcessibilityScroll } from '../../../components/AccessibilityScroll';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { withSSRAuth } from '../../../utils/withSSRAuth';
import styles from './perfil.module.scss';


export default function Perfil() {
  return (
    <>
      <AcessibilityScroll />
      <div className={styles.container}>
        <div className={styles.boxContent}>
          <div className={styles.profileForm}>
            <Link href="/app">
              <a>
                <FiArrowLeft size={20} />
              </a>
            </Link>
            <div className={styles.imageContainer}>
              <img src="/assets/profile2.png" alt="" />
              <button>Alterar</button>
            </div>
            <Input type="text" placeholder="Nome completo" value="Iago Nobre Silva" />
            <Input type="email" placeholder="Seu e-mail" value="iagonobre22@gmail.com" />
            <Button>EDITAR</Button>
          </div>
          <div className={styles.line} />
          <div className={styles.profileContent}>
            <h3>Editar Perfil</h3>
            <div />
            <Link href=""><a>Alterar minha senha</a></Link>
            <Link href="/privacy"><a>Política de Privacidade</a></Link>
            <Link href=""><a>Excluir minha conta</a></Link>
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {}
  }
});