import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi'

import { AcessibilityScroll } from "../../components/AccessibilityScroll";
import { AccountBox } from "../../components/AccountBox";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useAuth } from '../../hooks/auth';
import { withSSRGuest } from '../../utils/withSSRGuest';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import styles from './account.module.scss';

type LoginProps = {
  email: string;
  password: string;
}

export default function Account() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  function handleGoBack() {
    router.back();
  }

  function handleNavigateToCreateAccount() {
    router.push('/account/create');
  }

  const schema = yup.object({
    email: yup.string().email('Precisa ser um e-mail válido').required('O e-mail é obrigatório'),
    password: yup.string().required('A senha é obrigatória')
  })

  const { reset, register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur'
  })

  const onSubmit = async (data: LoginProps) => {
    const email = data.email;
    const password = data.password;

    try {
      setLoading(true);
      await login(email, password);
      setLoading(false);
      reset()
      setError(null);
    } catch (err) {
      if (err.response.data.message) {
        setError(err.response.data.message)
      }
      reset()
      setLoading(false);
    }
  };

  return (
    <div className={styles.accountContainer}>
      <AcessibilityScroll />

      <AccountBox>
        <button onClick={handleGoBack}>
          <FiArrowLeft size={22} />
        </button>

        {error && (
          <div className={styles.error}>
            <p>{error}</p>
          </div>
        )}

        <form id="contentform" onSubmit={handleSubmit(onSubmit)} >
          <Input
            type="email"
            id="email"
            placeholder="Digite o seu e-mail"
            error={errors.email?.message}
            register={register("email")}
          />
          <Input
            type="password"
            id="password"
            placeholder="Digite a sua senha"
            error={errors.password?.message}
            register={register("password")}
          />
          <Button type="submit" form="contentform" disabled={loading}>{loading ? 'ENTRANDO' : 'ENTRAR'}</Button>
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

export const getServerSideProps = withSSRGuest(async () => {
  return {
    props: {}
  }
});