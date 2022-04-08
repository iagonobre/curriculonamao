
import { Header } from '../../../components/Header';
import styles from './form.module.scss';

import { useForm } from "react-hook-form";

import { SelectForm } from '../../../components/SelectForm';
import { CheckboxForm } from '../../../components/CheckboxForm';
import { InputForm } from '../../../components/InputForm';

import { useCallback, useState } from 'react';

import * as yup from "yup";

export default function Form() {
  const [step, setStep] = useState(0);
  const [states, setStates] = useState<String[]>();

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
                  inputSize="large"
                  type="text"
                  placeholder="Ana Maria da Silva"
                  title="Nome Completo*"
                  id="name"
                  {...register("name")}
                />
                <InputForm
                  inputSize="middle"
                  type="date"
                  title="Data de Nascimento*"
                  id="date"
                  {...register("date")}
                />
              </div>

              <div className={styles.inputContainer}>
                <InputForm
                  inputSize="large"
                  type="email"
                  placeholder="anamariasilva@gmail.com"
                  title="E-mail*"
                  id="email"
                  {...register("email")}
                />
                <InputForm
                  inputSize="middle"
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
                  inputSize="small"
                  type="text"
                  placeholder="99999-999"
                  title="CEP"
                  id="cep"
                  {...register("cep")}
                />

                <InputForm
                  inputSize="large"
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
                <CheckboxForm
                  id="namee"
                >
                  Experiência em andamento
                </CheckboxForm>
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
              <h3>Curso de aperfeiçoamento</h3>
              <div className={styles.inputContainer}>
                <InputForm
                  type="text"
                  placeholder="Gerente de Vendas"
                  title="Curso de aperfeiçoamento"
                  id="cursodeaperfeicoamento"
                  {...register("cursodeaperfeicoamento")}
                />
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
                <SelectForm
                  title="Nível de Conhecimento"
                  id="nivelconhecimento"
                  {...register("nivelconhecimento")}
                >
                  <option value="" disabled selected>Selecionar</option>
                  <option value="Iniciante">Iniciante</option>
                  <option value="Intermediario">Intermediário</option>
                  <option value="Avançado">Avançado</option>
                </SelectForm>
              </div>

              <div className={styles.inputContainer}>
                <InputForm
                  type="text"
                  placeholder="20h"
                  title="Carga horária"
                  id="cargahoraria"
                  {...register("cargahoraria")}
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

              <h3>Habilidades</h3>
              <div className={styles.inputContainer}>
                <InputForm
                  type="text"
                  placeholder="Experiência em Photoshop"
                  title="Nome da Habilidade, Tecnologia ou Ferramenta"
                  id="nomehabilidade"
                  {...register("nomehabilidade")}
                />
              </div>

              <div className={styles.inputContainer}>
                <SelectForm
                  title="Nível de Conhecimento"
                  id="nivelconhecimento"
                  {...register("nivelconhecimento")}
                >
                  <option value="" disabled selected>Selecionar</option>
                  <option value="Iniciante">Iniciante</option>
                  <option value="Intermediario">Intermediário</option>
                  <option value="Avançado">Avançado</option>
                </SelectForm>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h3>Informações sobre a deficiência</h3>
              <div className={styles.inputContainer}>
                <InputForm
                  type="text"
                  placeholder="299.3"
                  title="Número do CID:*"
                  id="CID"
                  {...register("CID")}
                />
              </div>

              <div className={styles.inputContainer}>
                <InputForm
                  type="text"
                  placeholder="Perda auditiva parcial"
                  title="Grau de deficiência:*"
                  id="graudedeficiencia"
                  {...register("graudedeficiencia")}
                />
              </div>

              <div className={styles.inputContainer}>
                <InputForm
                  type="text"
                  placeholder="Não preciso de equipamento ou adaptações ou preciso de..."
                  title="Equipamento ou adaptações necessárias* "
                  id="equipamento"
                  {...register("equipamento")}
                />
              </div>

              <div className={styles.inputContainer}>
                <InputForm
                  type="text"
                  placeholder="Não tenho limitações cotidianas ou tenho limitações com..."
                  title="Limitações cotidianas*"
                  id="limitacoes"
                  {...register("limitacoes")}
                />
              </div>

              <div className={styles.inputContainer}>
                <InputForm
                  type="text"
                  placeholder="Escreva aqui"
                  title="Informações adicionais*"
                  id="infoadicionais"
                  {...register("infoadicionais")}
                />
              </div>
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