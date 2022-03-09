import { InputForm } from '../../../components/InputForm';
import { Header } from '../../../components/Header';
import styles from './form.module.scss';

import { useForm } from "react-hook-form";
import { SelectForm } from '../../../components/SelectForm';
import { useCallback, useState } from 'react';

import * as yup from "yup";

export default function Form() {
  const [step, setStep] = useState(1);

  const useYupValidationResolver = (validationSchema) => useCallback(async (data) => {
    try {
      const values = await validationSchema.validate(data, {
        abortEarly: false
      });

      return {
        values,
        errors: {}
      };
    } catch (errors) {
      return {
        values: {},
        errors: errors.inner.reduce(
          (allErrors, currentError) => ({
            ...allErrors,
            [currentError.path]: {
              type: currentError.type ?? "validation",
              message: currentError.message
            }
          }),
          {}
        )
      };
    }
  },
    [validationSchema]
  );

  const validationSchema = yup.object({
    name: yup.string().required("Esta informação é obrigatória"),
    date: yup.string().required("Required"),
    email: yup.string().email().required("Required"),
    phone: yup.number().required("Required"),
    maritalstatus: yup.string().required("Required"),
    linkedin: yup.string().required("Required"),
    cep: yup.string().required("Required"),
    street: yup.string().required("Required"),
    district: yup.string().required("Required"),
    city: yup.string().required("Required"),
    state: yup.string().required("Required"),
    number: yup.number().required("Required"),
  });

  const resolver = useYupValidationResolver(validationSchema);

  const { register, handleSubmit, watch, formState: { errors } } = useForm({ resolver });
  const onSubmit = (data) => console.log(data);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

          {step === 0 && (
            <>
              <h3>Informações Básicas</h3>

              <div className={styles.inputContainer}>
                <InputForm
                  type="text"
                  placeholder="Ana Maria da Silva"
                  title="Nome Completo*"
                  id="name"
                  {...register("name")}
                />
                <InputForm
                  type="date"
                  title="Data de Nascimento*"
                  id="date"
                  {...register("date")}
                />
              </div>

              <div className={styles.inputContainer}>
                <InputForm
                  type="email"
                  placeholder="anamariasilva@gmail.com"
                  title="E-mail*"
                  id="email"
                  {...register("email")}
                />
                <InputForm
                  type="tel"
                  placeholder="(DD) 99999-9999"
                  title="Telefone*"
                  id="phone"
                  {...register("phone")}
                />
              </div>

              <div className={styles.inputContainer}>
                <SelectForm
                  title="Estado Civil*"
                  id="maritalstatus"
                  {...register("maritalstatus")}
                >
                  <option value="" disabled selected>Selecionar</option>
                  <option value="Solteiro">Solteiro</option>
                  <option value="Casado">Casado</option>
                  <option value="Separado">Separado</option>
                  <option value="Divorciado">Divorciado</option>
                  <option value="Viúvo">Viúvo</option>
                </SelectForm>

                <InputForm
                  type="url"
                  placeholder="https://www.linkedin.com/in/ana"
                  title="LinkedIn"
                  id="linkedin"
                  {...register("linkedin")}
                />
              </div>

              <h3>Endereço</h3>

              <div className={styles.inputContainer}>
                <InputForm
                  type="text"
                  placeholder="99999-999"
                  title="CEP"
                  id="cep"
                  {...register("cep")}
                />

                <InputForm
                  type="text"
                  placeholder="Avenida Machado de Assis"
                  title="Rua"
                  id="street"
                  {...register("street")}
                />
              </div>

              <div className={styles.inputContainer}>
                <InputForm
                  type="text"
                  placeholder="Vila Mariana"
                  title="Bairro*"
                  id="district"
                  {...register("district")}
                />

                <InputForm
                  type="text"
                  placeholder="São Paulo"
                  title="Cidade*"
                  id="city"
                  {...register("city")}
                />
              </div>

              <div className={styles.inputContainer}>
                <SelectForm
                  title="Estado*"
                  id="state"
                  {...register("state")}
                >
                  <option value="" disabled selected>Selecionar</option>
                  <option value="RN">RN</option>
                  <option value="RN">RN</option>
                  <option value="RN">RN</option>
                  <option value="RN">RN</option>
                  <option value="RN">RN</option>
                </SelectForm>

                <InputForm
                  type="number"
                  placeholder="123"
                  title="Número"
                  id="number"
                  {...register("number")}
                />
              </div>
            </>
          )}


          {step === 1 && (
            <>
              <div className={styles.inputContainer}>
                <InputForm
                  type="text"
                  placeholder="Escreva qual o seu cargo ou área de interesse"
                  title="Objetivo"
                  id="objetivo"
                  {...register("objetivo")}
                />
              </div>

              <h3>Experiência Profissional</h3>
              <div className={styles.inputContainer}>
                <InputForm
                  type="text"
                  placeholder="Márcio Calçados"
                  title="Nome da empresa"
                  id="nomeempresa"
                  {...register("nomeempresa")}
                />
                </div>

              <div className={styles.inputContainer}>
                <InputForm
                  type="text"
                  placeholder="Gerente de Vendas"
                  title="Cargo ou Posição"
                  id="cargo"
                  {...register("cargo")}
                />
                </div>

                <div className={styles.inputContainer}>
                <InputForm
                  type="text"
                  placeholder="DD/MM/AAAA"
                  title="Início"
                  id="inicio"
                  {...register("inicio")}
                />

                  <InputForm
                  type="text"
                  placeholder="DD/MM/AAAA"
                  title="Fim"
                  id="fim"
                  {...register("fim")}
                />
              </div>

               <div className={styles.inputContainer}>
                <InputForm
                  type="text"
                  placeholder="Descreva as atividades mais importantes que você exerceu"
                  title="Descrição:"
                  id="descricao"
                  {...register("descricao")}
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
            <h3>Formação Acadêmica</h3>
            <div className={styles.inputContainer}>
                <SelectForm
                  title="Tipo ou nível acadêmico"
                  id="nivelacademico"
                  {...register("nivelacademico")}
                >
                  <option value="" disabled selected>Selecionar</option>
                  <option value="Ensino Fundamental I">Ensino Fundamental I</option>
                  <option value="Ensino Fundamental II">Ensino Fundamental II</option>
                  <option value="Licenciatura">Licenciatura</option>
                  <option value="Graduação">Graduação</option>
                  <option value="Pós-graduação">Pós-graduação</option>
                  <option value="Mestrado">Mestrado</option>
                  <option value="Doutorado">Doutorado</option>
                  <option value="PHD">PHD</option>
                </SelectForm>
            </div>

            <div className={styles.inputContainer}>
                <InputForm
                  type="text"
                  placeholder="Instituto Federal do Rio Grande do Norte"
                  title="Nome da Instituição"
                  id="nomeinstituicao"
                  {...register("nomeinstituicao")}
                />
              </div>

              <div className={styles.inputContainer}>
                <InputForm
                  type="text"
                  placeholder="Gerente de Vendas"
                  title="Curso"
                  id="curso"
                  {...register("curso")}
                />
              </div>

            <div className={styles.inputContainer}>
                <InputForm
                  type="text"
                  placeholder="DD/MM/AAAA"
                  title="Início"
                  id="inicio"
                  {...register("inicio")}
                />

                  <InputForm
                  type="text"
                  placeholder="DD/MM/AAAA"
                  title="Fim"
                  id="fim"
                  {...register("fim")}
                />
            </div>

            </>
          )}

          {step === 3 && (
            <>

            </>
          )}

          {step === 4 && (
            <>

            </>
          )}

        </form>
        <div className={styles.next}>
          <h1>Aqui vai ficar a imagem</h1>
          <h1>Aqui vai ficar a imagem</h1>
          <h1>Aqui vai ficar a imagem</h1>
        </div>
      </div>

    </>
  )
}