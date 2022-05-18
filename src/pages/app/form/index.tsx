
import { Header } from '../../../components/Header';
import styles from './form.module.scss';

import { useForm } from "react-hook-form";

import { SelectForm } from '../../../components/SelectForm';
import { CheckboxForm } from '../../../components/CheckboxForm';
import { InputForm } from '../../../components/InputForm';

import { useCallback, useEffect, useState } from 'react';
import Lottie from 'react-lottie';

import axios from 'axios';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import * as animationData from '../../../../public/typing.json'

type State = {
  id: number;
  sigla: string;
}

export default function Form() {
  const [step, setStep] = useState(1);
  const [states, setStates] = useState<State[]>();

  useEffect(() => {
    async function getStates() {
      await axios.get('https://brasilapi.com.br/api/ibge/uf/v1').then(({ data }) => {
        setStates(data);
      }).catch(() => {
        // TRATAR ERRO
      })
    }
    getStates();
  }, [])

  const schema = yup.object({
    name: yup.string().required('O nome é obrigatório'),
    bornDate: yup.date().required('A data é obrigatória'),
    email: yup.string().email('Precisa ser um e-mail válido').required('O e-mail é obrigatória'),
    phone: yup.string().required()
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur'
  })

  const onSubmit = (data) => console.log(data);

  return (
    <>
      {console.log(errors)}
      <Header />
      <div className={styles.stepContainer}>
        <span />
        <div className={`${styles.stepBox}`}>
          <button>
            <div>
              <p>1</p>
            </div>
          </button>
          <div className={styles.stepText}>
            <p>Dados Pessoais</p>
          </div>
        </div>

        <div className={`${styles.stepBox} ${step < 1 && styles.stepBoxDisabled}`}>
          <button>
            <div>
              <p>2</p>
            </div>
          </button>
          <div className={styles.stepText}>
            <p>Vida Profissional</p>
          </div>
        </div>

        <div className={`${styles.stepBox} ${step < 2 && styles.stepBoxDisabled}`}>
          <button>
            <div>
              <p>3</p>
            </div>
          </button>
          <div className={styles.stepText}>
            <p>Vida Acadêmica</p>
          </div>
        </div>

        <div className={`${styles.stepBox} ${step < 3 && styles.stepBoxDisabled}`}>
          <button>
            <div>
              <p>4</p>
            </div>
          </button>
          <div className={styles.stepText}>
            <p>Certificados e Cursos</p>
          </div>
        </div>

        <div className={`${styles.stepBox} ${step < 4 && styles.stepBoxDisabled}`}>
          <button>
            <div>
              <p>5</p>
            </div>
          </button>
          <div className={styles.stepText}>
            <p>Dados Adicionais</p>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <form id="contentform" className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
                  error={errors.name?.message}
                  register={register("name")}
                />

                <InputForm
                  inputSize="middle"
                  type="date"
                  title="Data de Nascimento*"
                  id="bornDate"
                  error={errors.bornDate?.message}
                  register={register("bornDate")}
                />
              </div>

              <div className={styles.inputContainer}>
                <InputForm
                  inputSize="large"
                  type="email"
                  title="Email*"
                  id="email"
                  error={errors.email?.message}
                  register={register("email")}
                />
                <InputForm
                  inputSize="middle"
                  type="tel"
                  placeholder="(DD) 99999-9999"
                  title="Telefone*"
                  id="phone"
                  error={errors.phone?.message}
                  register={register("phone")}
                />
              </div>

              <div className={styles.inputContainer}>
                <SelectForm
                  title="Estado Civil*"
                  id="maritalstatus"
                  register={register("maritalstatus")}
                >
                  <option value="" disabled selected>Selecionar</option>
                  <option value="Solteiro">Solteiro</option>
                  <option value="Casado">Casado</option>
                  <option value="Separado">Separado</option>
                  <option value="Divorciado">Divorciado</option>
                  <option value="Viúvo">Viúvo</option>
                </SelectForm>

                <InputForm
                  inputSize="large"
                  type="url"
                  placeholder="https://www.linkedin.com/in/ana"
                  title="LinkedIn"
                  id="linkedin"
                  error={errors.linkedin?.message}
                  register={register("linkedin")}
                />
              </div>

              <h3>Endereço</h3>
              <p>Atenção! Alguns campos do endereço são optativos. Recomendamos o preenchimento apenas das informações necessárias.</p>

              <div className={styles.inputContainer}>
                <InputForm
                  inputSize="small"
                  type="text"
                  placeholder="99999-999"
                  title="CEP"
                  id="cep"
                  error={errors.cep?.message}
                  register={register("cep")}
                />

                <InputForm
                  inputSize="large"
                  type="text"
                  placeholder="Avenida Machado de Assis"
                  title="Rua"
                  id="street"
                  error={errors.street?.message}
                  register={register("street")}
                />
              </div>

              <div className={styles.inputContainer}>
                <InputForm
                  inputSize="large"
                  type="text"
                  placeholder="Vila Mariana"
                  title="Bairro*"
                  id="district"
                  error={errors.district?.message}
                  register={register("district")}
                />

                <InputForm
                  inputSize="middle"
                  type="text"
                  placeholder="São Paulo"
                  title="Cidade*"
                  id="city"
                  error={errors.city?.message}
                  register={register("city")}
                />
              </div>

              <div className={styles.inputContainer}>
                <SelectForm
                  title="Estado*"
                  id="state"
                  register={register("state")}
                >
                  <option value="" disabled selected>Selecionar</option>
                  {states?.map((state) => (
                    <option key={state.id} value={state.sigla}>{state.sigla}</option>
                  ))}
                </SelectForm>

                <InputForm
                  inputSize="small"
                  type="number"
                  placeholder="123"
                  title="Número"
                  id="number"
                  error={errors.number?.message}
                  register={register("number")}
                />
              </div>
            </>
          )}


          {step === 1 && (
            <>
              <div className={styles.inputContainer}>
                <InputForm
                  inputSize="large"
                  type="text"
                  placeholder="Escreva qual o seu cargo ou área de interesse"
                  title="Objetivo"
                  id="objetivo"
                  register={register("objetivo")}
                />
              </div>

              <h3>Experiência Profissional</h3>
              <p>Dica! Recomendamos que você escreva seus últimos três empregos ou as três experiências profissionais mais semelhantes ao seu objetivo atual.</p>

              <div className={styles.inputContainer}>
                <InputForm
                  inputSize="large"
                  type="text"
                  placeholder="Márcio Calçados"
                  title="Nome da empresa*"
                  id="nomeempresa"
                  error={errors.nomeempresa?.message}
                  register={register("nomeempresa")}
                />
              </div>

              <div className={styles.inputContainer}>
                <InputForm
                  inputSize="large"
                  type="text"
                  placeholder="Gerente de Vendas"
                  title="Cargo ou Posição*"
                  id="cargo"
                  error={errors.cargo?.message}
                  register={register("cargo")}
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
                  inputSize="middle"
                  type="date"
                  placeholder="DD/MM/AAAA"
                  title="Início*"
                  id="inicio"
                  error={errors.inicio?.message}
                  register={register("inicio")}
                />

                <InputForm
                  inputSize="middle"
                  type="date"
                  placeholder="DD/MM/AAAA"
                  title="Fim"
                  id="fim"
                  error={errors.fim?.message}
                  register={register("fim")}
                />
              </div>

              <div className={styles.inputContainer}>
                <InputForm
                  inputSize="large"
                  type="text"
                  placeholder="Descreva as atividades mais importantes que você exerceu"
                  title="Descrição:*"
                  id="descricao"
                  error={errors.descricao?.message}
                  register={register("descricao")}
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h3>Formação Acadêmica</h3>
              <div className={styles.inputContainer}>
                <SelectForm
                  title="Tipo ou nível acadêmico*"
                  id="nivelacademico"
                  register={register("nivelacademico")}
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
                  inputSize="large"
                  type="text"
                  placeholder="Instituto Federal do Rio Grande do Norte"
                  title="Nome da Instituição*"
                  id="nomeinstituicao"
                  error={errors.nomeinstituicao?.message}
                  register={register("nomeinstituicao")}
                />
              </div>

              <div className={styles.inputContainer}>
                <InputForm
                  inputSize="large"
                  type="text"
                  placeholder="Gerente de Vendas"
                  title="Curso"
                  id="curso"
                  error={errors.curso?.message}
                  register={register("curso")}
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
                  inputSize="middle"
                  type="date"
                  placeholder="DD/MM/AAAA"
                  title="Início*"
                  id="beginExperience"
                  error={errors.beginExperience?.message}
                  register={register("beginExperience")}
                />

                <InputForm
                  inputSize="middle"
                  type="text"
                  placeholder="DD/MM/AAAA"
                  title="Término*"
                  id="endExperience"
                  error={errors.endExperience?.message}
                  register={register("endExperience")}
                />
              </div>

            </>
          )}

          {step === 3 && (
            <>
              <h3>Curso de aperfeiçoamento</h3>
              <div className={styles.inputContainer}>
                <InputForm
                  inputSize="large"
                  type="text"
                  placeholder="Gerente de Vendas"
                  title="Curso de aperfeiçoamento"
                  id="cursodeaperfeicoamento"
                  error={errors.cursodeaperfeicoamento?.message}
                  register={register("cursodeaperfeicoamento")}
                />
              </div>

              <div className={styles.inputContainer}>
                <InputForm
                  inputSize="large"
                  type="text"
                  placeholder="Instituto Federal do Rio Grande do Norte"
                  title="Nome da Instituição"
                  id="nomeinstituicao"
                  error={errors.nomeinstituicao?.message}
                  register={register("nomeinstituicao")}
                />
              </div>

              <div className={styles.inputContainer}>
                <SelectForm
                  title="Nível de Conhecimento"
                  id="nivelconhecimento"
                  register={register("nivelconhecimento")}
                >
                  <option value="" disabled selected>Selecionar</option>
                  <option value="Iniciante">Iniciante</option>
                  <option value="Intermediario">Intermediário</option>
                  <option value="Avançado">Avançado</option>
                </SelectForm>

                <InputForm
                  inputSize="middle"
                  type="text"
                  placeholder="20h"
                  title="Carga horária"
                  id="cargahoraria"
                  error={errors.cargahoraria?.message}
                  register={register("cargahoraria")}
                />
              </div>

              <div className={styles.inputContainer}>
                <InputForm
                  inputSize="middle"
                  type="text"
                  placeholder="DD/MM/AAAA"
                  title="Início*"
                  id="beginCourse"
                  error={errors.beginExperience?.message}
                  register={register("beginCourse")}
                />

                <InputForm
                  inputSize="middle"
                  type="text"
                  placeholder="DD/MM/AAAA"
                  title="Término*"
                  id="endCourse"
                  error={errors.endExperience?.message}
                  register={register("endCourse")}
                />
              </div>

              <h3>Habilidades</h3>
              <div className={styles.inputContainer}>
                <InputForm
                  inputSize="large"
                  type="text"
                  placeholder="Experiência em Photoshop"
                  title="Nome da Habilidade, Tecnologia ou Ferramenta"
                  id="nomehabilidade"
                  error={errors.nomehabilidade?.message}
                  register={register("nomehabilidade")}
                />
              </div>

              <div className={styles.inputContainer}>
                <SelectForm
                  title="Nível de Conhecimento"
                  id="nivelconhecimento"
                  register={register("nivelconhecimento")}
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
                  inputSize="small"
                  type="text"
                  placeholder="299.3"
                  title="Número do CID:*"
                  id="CID"
                  error={errors.CID?.message}
                  register={register("CID")}
                />

                <InputForm
                  inputSize="large"
                  type="text"
                  placeholder="Perda auditiva parcial"
                  title="Grau de deficiência:*"
                  id="graudedeficiencia"
                  error={errors.graudedeficiencia?.message}
                  register={register("graudedeficiencia")}
                />
              </div>

              <div className={styles.inputContainer}>
                <InputForm
                  inputSize="large"
                  type="text"
                  placeholder="Não preciso de equipamento ou adaptações ou preciso de..."
                  title="Equipamento ou adaptações necessárias* "
                  id="equipamento"
                  error={errors.equipamento?.message}
                  register={register("equipamento")}
                />
              </div>

              <div className={styles.inputContainer}>
                <InputForm
                  inputSize="large"
                  type="text"
                  placeholder="Não tenho limitações cotidianas ou tenho limitações com..."
                  title="Limitações cotidianas*"
                  id="limitacoes"
                  error={errors.limitacoes?.message}
                  register={register("limitacoes")}
                />
              </div>

              <div className={styles.inputContainer}>
                <InputForm
                  inputSize="large"
                  type="text"
                  placeholder="Escreva aqui"
                  title="Informações adicionais*"
                  id="infoadicionais"
                  error={errors.infoadicionais?.message}
                  register={register("infoadicionais")}
                />
              </div>
            </>
          )}

        </form>
        <div className={styles.next}>
          <div>
            <Lottie
              options={{
                animationData,
              }}
            />
            <div>
              {step > 0 && (
                <button>VOLTAR</button>
              )}
              <button type="submit" form="contentform">CONTINUAR</button>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}