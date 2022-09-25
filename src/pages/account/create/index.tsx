import { useRouter } from 'next/router';
import { FiArrowLeft } from 'react-icons/fi'

import { AcessibilityScroll } from "../../../components/AccessibilityScroll";
import { AccountBox } from "../../../components/AccountBox";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { withSSRGuest } from '../../../utils/withSSRGuest';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import styles from './account.module.scss';
import { useState } from 'react';
import api from '../../../services/api';

type CreateAccount = {
  name: string;
  email: string;
  password: string;
  passwordCheck: string;
}

export default function AccountCreate() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleGoBack() {
    router.back();
  }

  const schema = yup.object({
    name: yup.string().required('O nome é obrigatório'),
    email: yup.string().email('Precisa ser um e-mail válido').required('O e-mail é obrigatório'),
    password: yup.string().required('A senha é obrigatória'),
    passwordCheck: yup.string().required('A senha é obrigatória')
  })

  const { reset, register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur'
  })

  const onSubmit = async (data: CreateAccount) => {
    const name = data.name;
    const email = data.email;
    const password = data.password;
    const passwordCheck = data.passwordCheck;

    if (password !== passwordCheck) {
      reset()
      setError('Por favor, certifique que as duas senhas estejam iguais.')
      return;
    }

    try {
      setLoading(true);
      const response = await api.post('/user', {
        name,
        email,
        password,
      })

      console.log(response.data)

      setLoading(false);
      setError(null);
      reset()
    } catch (err) {
      if (err.response.data.message) {
        setError(err.response.data.message)
      }
      reset()
      setError(null);
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
            id="name"
            type="text"
            placeholder="Digite o seu nome completo"
            error={errors.name?.message}
            register={register("name")}
          />
          <Input
            id="email"
            type="email"
            placeholder="Digite o seu e-mail"
            error={errors.email?.message}
            register={register("email")}
          />
          <Input
            id="password"
            type="password"
            placeholder="Crie uma senha"
            error={errors.password?.message}
            register={register("password")}
          />
          <Input
            id="passwordCheck"
            type="password"
            placeholder="Repita a senha"
            error={errors.passwordCheck?.message}
            register={register("passwordCheck")}
          />
          <Button type="submit" form="contentform" disabled={loading}>{loading ? 'CRIANDO' : 'CRIAR CONTA'}</Button>
        </form>
      </AccountBox>
    </div>
  )
}

export const getServerSideProps = withSSRGuest(async () => {
  return {
    props: {}
  }
});