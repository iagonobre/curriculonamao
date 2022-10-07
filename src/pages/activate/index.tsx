import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi'

import { AcessibilityScroll } from "../../components/AccessibilityScroll";
import { AccountBox } from "../../components/AccountBox";
import { Button } from '../../components/Button';
import api from '../../services/api';

import styles from './activate.module.scss';

export default function Account() {
  const router = useRouter();
  const { token, newEmail } = router.query

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    async function activateAccount() {
      if (token && !error) {
        const newToken = token as string
        const [sendToken,] = newToken.split('%')
        try {
          await api.post('/user/activate', {
            token: sendToken,
            newEmail: newEmail || null
          })
          setSuccess('A sua conta foi ativada com sucesso, realize o login no botão abaixo')
        } catch (err) {
          setError('Algum erro ocorreu e não foi possível ativar a sua conta.');
        }
      }
    }
    activateAccount()
  }, [token, newEmail, error])

  function handleNavigateToAccount() {
    router.push('/account')
  }

  function handleNavigateToHome() {
    router.push('/')
  }

  if (!error || !success) {
    return null;
  }

  return (
    <div className={styles.accountContainer}>
      <AcessibilityScroll />

      <AccountBox>
        {error ? (
          <div className={styles.form}>
            <div className={styles.error}>
              <p>{error}</p>
            </div>
            <Button onClick={handleNavigateToHome} styleType="outline">Página Inicial</Button>
          </div>
        ) : (
          <div className={styles.form}>
            <div className={styles.success}>
              <p>{success}</p>
            </div>
            <img src="/assets/recovery.svg" alt="Mulher de cabelo preto segurando um avião" />
            <Button onClick={handleNavigateToAccount} styleType="outline">Entrar</Button>
          </div>
        )}
      </AccountBox>
    </div>
  )
}