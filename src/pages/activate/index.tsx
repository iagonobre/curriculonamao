import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { AcessibilityScroll } from "../../components/AccessibilityScroll";
import { AccountBox } from "../../components/AccountBox";
import { Button } from '../../components/Button';
import api from '../../services/api';

import styles from './activate.module.scss';

export default function Account() {
  const router = useRouter();

  const token = router.query.token;
  const newToken = router.query.newToken;

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    async function activateAccount() {
      if (token && !error) {
        try {
          await api.post('/user/activate', {
            token,
            newEmail: newToken ? newToken : null,
          })
          setSuccess('A sua conta foi ativada com sucesso, realize o login no botão abaixo')
        } catch (err) {
          setError('Algum erro ocorreu e não foi possível ativar a sua conta.');
        }
      }
    }
    activateAccount()
  }, [error, token, newToken])

  return (
    <div className={styles.accountContainer}>
      <AcessibilityScroll />

      <AccountBox>
        <div className={styles.form}>
          {error ? (
            <div className={styles.error}>
              <p>{error}</p>
            </div>
          ) : (
            success && (
              <div className={styles.success}>
                <p>{success}</p>
              </div>
            )
          )}
          <img src="/assets/recovery.svg" alt="Mulher de cabelo preto segurando um avião" />
          {error ? (
            <Link href="/" passHref>
              <Button styleType="outline">Página Inicial</Button>
            </Link>
          ) : (
            success && (
              <Link href="/account" passHref>
                <Button styleType="outline">Entrar</Button>
              </Link>
            )
          )}
        </div>
      </AccountBox>
    </div>
  )
}