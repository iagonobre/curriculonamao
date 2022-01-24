import { route } from 'next/dist/server/router';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiArrowLeft } from 'react-icons/fi'

import { AcessibilityScroll } from "../../components/AccessibilityScroll";
import { AccountBox } from "../../components/AccountBox";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

import styles from './recovery.module.scss';

export default function Account() {
  const router = useRouter();

  function handleGoBack() {
    router.back();
  }
  
  return (
    <div className={styles.accountContainer}>
      <AcessibilityScroll />

      <AccountBox>
        <button onClick={handleGoBack}>
          <FiArrowLeft size={22} />
        </button>

        <form action="">
          <img src="/assets/recovery.svg" alt="" />
          <p>Insira o e-mail <br /> associado a sua conta</p>
          <Input type="email" id="email" placeholder="Digite o seu e-mail" />
          <Button>CONTINUAR</Button>
        </form>
      </AccountBox>
    </div>
  )
}