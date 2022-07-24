import { route } from 'next/dist/server/router';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi'

import { AcessibilityScroll } from "../../components/AccessibilityScroll";
import { AccountBox } from "../../components/AccountBox";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useAuth } from '../../hooks/auth';

import styles from './account.module.scss';

export default function Account() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const [email, setEmail] = useState('')

  function handleGoBack() {
    router.back();
  }

  function handleNavigateToCreateAccount() {
    router.push('/account/create');
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[0].value;

    try {
      setLoading(true);
      await login(email, password);
      setLoading(false);
    } catch {
      setLoading(false);
    }

  }

  return (
    <div className={styles.accountContainer}>
      <AcessibilityScroll />

      <AccountBox>
        <button onClick={handleGoBack}>
          <FiArrowLeft size={22} />
        </button>

        <form onSubmit={handleLogin}>
          <Input type="email" id="email" placeholder="Digite o seu e-mail" />
          <Input type="password" id="password" placeholder="Digite a sua senha" />
          <Button type="submit" disabled={loading}>{loading ? 'ENTRANDO' : 'ENTRAR'}</Button>
        </form>

        <Button disabled={loading} styleType="outline" onClick={handleNavigateToCreateAccount}>CRIAR CONTA</Button>
        <div className={styles.recoveryStyle}>
          <Link href="/recovery" >
            <a className={styles.recoveryStyle}>Esqueceu sua senha</a>
          </Link>
        </div>

      </AccountBox>
    </div>
  )
}