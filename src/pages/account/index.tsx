import { route } from 'next/dist/server/router';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiArrowLeft } from 'react-icons/fi'

import { AcessibilityScroll } from "../../components/AccessibilityScroll";
import { AccountBox } from "../../components/AccountBox";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

import styles from './account.module.scss';

export default function Account() {
  const router = useRouter();

  function handleGoBack() {
    router.back();
  }

  function handleNavigateToCreateAccount() {
    router.push('/account/create');
  }

  return (
    <div className={styles.accountContainer}>
      <AcessibilityScroll />

      <AccountBox>
        <button onClick={handleGoBack}>
          <FiArrowLeft size={22} />
        </button>

        <form action="">
          <Input type="email" id="email" placeholder="Digite o seu e-mail" />
          <Input type="password" id="password" placeholder="Digite a sua senha" />
          <Button>ENTRAR</Button>
        </form>

        <Button styleType="outline" onClick={handleNavigateToCreateAccount}>CRIAR CONTA</Button>
        <div className={styles.recoveryStyle}>
          <Link href="/recovery" >
            <a className={styles.recoveryStyle}>Esqueceu sua senha</a>
          </Link>
        </div>

      </AccountBox>
    </div>
  )
}