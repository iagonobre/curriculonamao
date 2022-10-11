import { useRouter } from 'next/router';
import { FiArrowLeft } from 'react-icons/fi'

import { AcessibilityScroll } from "../../components/AccessibilityScroll";
import { AccountBox } from "../../components/AccountBox";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import styles from './recovery.module.scss';
import { useState } from 'react';
import api from '../../services/api';

export default function Account() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [send, setSend] = useState(false);
  const [error, setError] = useState('');

  function handleGoBack() {
    router.back();
  }

  const schema = yup.object({
    email: yup.string().email('Precisa ser um e-mail válido').required('O e-mail é obrigatório'),
  })

  const { reset, register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur'
  })

  const onSubmit = async ({ email }: { email: string }) => {
    try {
      setLoading(true);
      await api.post('/user/recovery', {
        email
      })
      setLoading(false)
      reset()
      setSend(true)
    } catch (err) {
      setSend(false)
      if (err.response.data.message) {
        setError(err.response.data.message)
      }
      reset()
      setLoading(false);
    }
  };

  if (send) {
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

          <form id="recoveryform" onSubmit={handleSubmit(onSubmit)} >
            <img src="/assets/mail.svg" alt="Carta de correspondência simbolizando e-mail" />
            <p>Enviamos um email com as instruções para a mudança de senha</p>
            <small>Caso não tenha recebido, verifique sua caixa de spam ou tente novamente</small>

            <Input
              type="email"
              id="email"
              placeholder="Digite o seu e-mail"
              error={errors.email?.message}
              register={register("email")}
            />
            <Button form="recoveryform" styleType='outline' type="submit">TENTAR NOVAMENTE</Button>
          </form>
        </AccountBox>
      </div>
    )
  }

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

        <form id="recoveryform" onSubmit={handleSubmit(onSubmit)} >
          <img src="/assets/recovery.svg" alt="Mulher de cabelo preto segurando um avião" />
          <p>Insira o e-mail <br /> associado a sua conta</p>

          <Input
            type="email"
            id="email"
            placeholder="Digite o seu e-mail"
            error={errors.email?.message}
            register={register("email")}
          />

          <Button type="submit" form="recoveryform" disabled={loading}>{loading ? 'Enviando' : 'CONTINUAR'}</Button>
        </form>
      </AccountBox>
    </div>
  )
}