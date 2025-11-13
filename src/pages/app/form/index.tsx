import { useEffect, useState } from "react";

import dynamic from "next/dynamic";
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((m) => m.Player),
  { ssr: false }
);
import animationData from "../../../../public/typing.json";

import axios from "axios";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFieldArray } from "react-hook-form";
import * as yup from "yup";

import { withSSRAuth } from "../../../utils/withSSRAuth";

import { Header } from "../../../components/Header";
import { SelectForm } from "../../../components/SelectForm";
import { InputForm } from "../../../components/InputForm";

import styles from "./form.module.scss";
import { CvProps } from "../../../dto/cvDTO";
import { FiPlusCircle } from "react-icons/fi";
import api from "../../../services/api";

import { useAuth } from "../../../hooks/auth";
import Router from "next/router";
import { parseCookies } from "nookies";
import { FieldPath } from "react-hook-form";

import { setLocale } from "yup";

import * as pt from "yup-locale-pt";
import { maskCep, maskPhone } from "./masks";
setLocale(pt.pt);

type State = {
  id: number;
  sigla: string;
};

export default function Form() {
  const [step, setStep] = useState(0);
  const [states, setStates] = useState<State[]>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { refresh } = useAuth();

  useEffect(() => {
    async function getStates() {
      await axios
        .get("https://brasilapi.com.br/api/ibge/uf/v1")
        .then(({ data }) => {
          setStates(data);
        })
        .catch(() => {
          // TRATAR ERRO
        });
    }
    getStates();
  }, []);

  const schema = yup.object({
    title: yup.string().required("O nome do currículo é obrigatório"),
    fullName: yup.string().required("O nome é obrigatório"),
    bornDate: yup.date().required("A data é obrigatória"),
    email: yup
      .string()
      .email("Precisa ser um e-mail válido")
      .required("O e-mail é obrigatório"),
    phone: yup.string().required("O telefone é obrigatório"),
    linkedin: yup.string().url(),
    street: yup.string(),
    district: yup.string().required("O bairro é obrigatório"),
    city: yup.string().required("A cidade é obrigatório"),
    number: yup.string(),
    objetivo: yup.string(),
    professionalExperiences: yup.array().of(
      yup.object().shape({
        businessName: yup.string().required("O nome da empresa é obrigatório"),
        position: yup.string().required("Informar o cargo é obrigatório"),
        description: yup.string().required("A descrição é obrigatória"),
        startDate: yup.date().required("A data é obrigatória"),
      })
    ),
    schoolEducation: yup.array().of(
      yup.object().shape({
        position: yup.string().required("O nível acadêmico é obrigatório"),
        schoolName: yup
          .string()
          .required("O nome da instituição é obrigatório"),
        course: yup.string().required("O nome do curso é obrigatório"),
        startDate: yup.date().required("A data é obrigatória"),
      })
    ),
    aditionalCourses: yup.array().of(
      yup.object().shape({
        courseName: yup.string().required("O curso é obrigatório"),
        schoolName: yup.string().required("O nome da escola é obrigatório"),
        totalTime: yup.string().required("A carga horária é obrigatória"),
        startDate: yup.date().required("A data inicial é obrigatória"),
      })
    ),
    ability: yup.array().of(
      yup.object().shape({
        name: yup
          .string()
          .required("O nome da habilidade é obrigatório")
          .nullable(),
      })
    ),
    cidNumber: yup.string(),
    deficiencyLevel: yup.string(),
    addaptationDescription: yup.string(),
    limitationDescription: yup.string(),
    aditionalInformation: yup.string(),
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm<CvProps>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: {
      professionalExperiences: [],
      schoolEducation: [],
      aditionalCourses: [],
      ability: [],
    },
  });

  const {
    fields: experienceFields,
    remove: removeExperiences,
    append: appendExperiences,
  } = useFieldArray({
    control,
    name: "professionalExperiences",
  });

  const {
    fields: schoolFields,
    remove: removeSchool,
    append: appendSchool,
  } = useFieldArray({
    control,
    name: "schoolEducation",
  });

  const {
    fields: coursesFields,
    remove: removeCourses,
    append: appendCourses,
  } = useFieldArray({
    control,
    name: "aditionalCourses",
  });

  const {
    fields: abilityFields,
    remove: removeAbility,
    append: appendAbility,
  } = useFieldArray({
    control,
    name: "ability",
  });

  const onSubmit = async (data: CvProps) => {
    try {
      setLoading(true);
      await refresh();
      const { "@cnm:token": token } = parseCookies();

      const {
        title,
        fullName,
        bornDate,
        email,
        phone,
        maritalStatus,
        linkedin,
        cep,
        address,
        district,
        city,
        state,
        number,
        purpose,
        cidNumber,
        deficiencyLevel,
        haveCertificate,
        addaptationDescription,
        limitationDescription,
        aditionalInformation,
      } = data;

      await api.post(
        "/cv",
        {
          resume: {
            title,
            fullName,
            bornDate,
            email,
            phone,
            maritalStatus,
            linkedin,
            cep,
            address,
            district,
            city,
            state,
            number: Number(number),
            purpose,
            cidNumber: Number(cidNumber),
            deficiencyLevel,
            haveCertificate,
            addaptationDescription,
            limitationDescription,
            aditionalInformation,
          },
          professionalExperiences: data.professionalExperiences,
          schoolEducation: data.schoolEducation,
          aditionalCourses: data.aditionalCourses,
          ability: data.ability,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setLoading(false);
      setError(null);
      reset();
      Router.push("/app");
    } catch (err: any) {
      setLoading(false);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Ocorreu um erro ao enviar o formulário.");
      }
    }
  };

  const stepFields: FieldPath<CvProps>[][] = [
    ["title", "fullName", "bornDate", "email", "phone", "district", "city"],
    ["purpose", "professionalExperiences"],
    ["schoolEducation"],
    ["aditionalCourses", "ability"],
    [
      "cidNumber",
      "deficiencyLevel",
      "addaptationDescription",
      "limitationDescription",
      "aditionalInformation",
    ],
  ];

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

        <div
          className={`${styles.stepBox} ${step < 1 && styles.stepBoxDisabled}`}
        >
          <button>
            <div>
              <p>2</p>
            </div>
          </button>
          <div className={styles.stepText}>
            <p>Vida Profissional</p>
          </div>
        </div>

        <div
          className={`${styles.stepBox} ${step < 2 && styles.stepBoxDisabled}`}
        >
          <button>
            <div>
              <p>3</p>
            </div>
          </button>
          <div className={styles.stepText}>
            <p>Vida Acadêmica</p>
          </div>
        </div>

        <div
          className={`${styles.stepBox} ${step < 3 && styles.stepBoxDisabled}`}
        >
          <button>
            <div>
              <p>4</p>
            </div>
          </button>
          <div className={styles.stepText}>
            <p>Certificados e Cursos</p>
          </div>
        </div>

        <div
          className={`${styles.stepBox} ${step < 4 && styles.stepBoxDisabled}`}
        >
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
        <form
          id="contentform"
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          {step === 0 && (
            <>
              {error && (
                <div className={styles.error}>
                  <span>{error}</span>
                </div>
              )}

              <div className={styles.inputContainer}>
                <InputForm
                  inputSize="large"
                  type="title"
                  placeholder="Currículo para Empresa"
                  title="Nome do Currículo*"
                  id="title"
                  error={errors.title?.message}
                  register={register("title")}
                />
              </div>

              <h3>Informações Básicas</h3>

              <div className={styles.inputContainer}>
                <InputForm
                  inputSize="large"
                  type="text"
                  placeholder="Ana Maria da Silva"
                  title="Nome Completo*"
                  id="fullName"
                  error={errors.fullName?.message}
                  register={register("fullName")}
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
                  placeholder="anamaria@gmail.com"
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
                  register={register("phone", { onChange: maskPhone })}
                />
              </div>

              <div className={styles.inputContainer}>
                <SelectForm
                  title="Estado Civil"
                  id="maritalStatus"
                  register={register("maritalStatus")}
                >
                  <option value="" disabled selected>
                    Selecionar
                  </option>
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
              <p>
                Atenção! Alguns campos do endereço são optativos. Recomendamos o
                preenchimento apenas das informações necessárias.
              </p>

              <div className={styles.inputContainer}>
                <InputForm
                  inputSize="small"
                  type="text"
                  placeholder="99999-999"
                  title="CEP"
                  id="cep"
                  error={errors.cep?.message}
                  register={register("cep", { onChange: maskCep })}
                />

                <InputForm
                  inputSize="large"
                  type="text"
                  placeholder="Avenida Machado de Assis"
                  title="Rua"
                  id="address"
                  error={errors.address?.message}
                  register={register("address")}
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
                  title="Estado"
                  id="state"
                  register={register("state")}
                >
                  <option value="" disabled selected>
                    Selecionar
                  </option>
                  {states?.map((state) => (
                    <option key={state.id} value={state.sigla}>
                      {state.sigla}
                    </option>
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
                  id="purpose"
                  register={register("purpose")}
                />
              </div>

              {error && (
                <div className={styles.error}>
                  <span>{error}</span>
                </div>
              )}

              <h3>Experiência Profissional</h3>
              <p>
                Dica! Recomendamos que você escreva seus últimos três empregos
                ou as três experiências profissionais mais semelhantes ao seu
                objetivo atual.
              </p>

              {experienceFields.map((experience, index) => (
                <div key={experience.id} className={styles.fieldsContainer}>
                  <div className={styles.inputContainer}>
                    <InputForm
                      inputSize="large"
                      type="text"
                      placeholder="Márcio Calçados"
                      title="Nome da empresa*"
                      id="businessName"
                      error={
                        errors?.professionalExperiences?.[index]?.businessName
                          ?.message
                      }
                      register={register(
                        `professionalExperiences.${index}.businessName`
                      )}
                    />
                  </div>

                  <div className={styles.inputContainer}>
                    <InputForm
                      inputSize="large"
                      type="text"
                      placeholder="Gerente de Vendas"
                      title="Cargo ou Posição*"
                      id="position"
                      error={
                        errors.professionalExperiences?.[index]?.position
                          ?.message
                      }
                      register={register(
                        `professionalExperiences.${index}.position`
                      )}
                    />
                  </div>

                  <div className={styles.inputContainer}>
                    <div className={styles.checkbox}>
                      <input
                        type="checkbox"
                        id="professionalExperiencesNowExperience"
                        {...register(
                          `professionalExperiences.${index}.nowExperience`
                        )}
                      />
                      <label>Experiência em andamento</label>
                    </div>
                  </div>

                  <div className={styles.inputContainer}>
                    <InputForm
                      inputSize="middle"
                      type="date"
                      placeholder="DD/MM/AAAA"
                      title="Início*"
                      id="startDate"
                      error={
                        errors.professionalExperiences?.[index]?.startDate
                          ?.message
                      }
                      register={register(
                        `professionalExperiences.${index}.startDate`
                      )}
                    />

                    <InputForm
                      inputSize="middle"
                      type="date"
                      placeholder="DD/MM/AAAA"
                      title="Fim"
                      id="endDate"
                      error={
                        errors.professionalExperiences?.[index]?.endDate
                          ?.message
                      }
                      register={register(
                        `professionalExperiences.${index}.endDate`
                      )}
                    />
                  </div>

                  <div className={styles.inputContainer}>
                    <InputForm
                      inputSize="large"
                      type="text"
                      placeholder="Descreva as atividades mais importantes que você exerceu"
                      title="Descrição:*"
                      id="description"
                      error={
                        errors.professionalExperiences?.[index]?.description
                          ?.message
                      }
                      register={register(
                        `professionalExperiences.${index}.description`
                      )}
                    />
                  </div>
                  <button onClick={() => removeExperiences(index)}>
                    Remover Experiência
                  </button>
                  <div className={styles.line} />
                </div>
              ))}

              <button
                type="button"
                onClick={() => appendExperiences(null)}
                className={styles.addButton}
              >
                <FiPlusCircle size={48} />
              </button>
            </>
          )}

          {step === 2 && (
            <>
              {error && (
                <div className={styles.error}>
                  <span>{error}</span>
                </div>
              )}
              <h3>Formação Acadêmica</h3>

              {schoolFields.map((school, index) => (
                <div key={school.id} className={styles.fieldsContainer}>
                  <div className={styles.inputContainer}>
                    <SelectForm
                      title="Tipo ou nível acadêmico*"
                      id="position"
                      register={register(`schoolEducation.${index}.position`)}
                    >
                      <option value="" disabled selected>
                        Selecionar
                      </option>
                      <option value="Ensino Fundamental I">
                        Ensino Fundamental I
                      </option>
                      <option value="Ensino Fundamental II">
                        Ensino Fundamental II
                      </option>
                      <option value="Ensino Médio">Ensino Médio</option>
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
                      id="schoolName"
                      error={
                        errors.schoolEducation?.[index]?.schoolName?.message
                      }
                      register={register(`schoolEducation.${index}.schoolName`)}
                    />
                  </div>

                  <div className={styles.inputContainer}>
                    <InputForm
                      inputSize="large"
                      type="text"
                      placeholder="Gerente de Vendas"
                      title="Curso"
                      id="curso"
                      error={errors.schoolEducation?.[index]?.course?.message}
                      register={register(`schoolEducation.${index}.course`)}
                    />
                  </div>

                  <div className={styles.inputContainer}>
                    <div className={styles.checkbox}>
                      <input
                        type="checkbox"
                        {...register(`schoolEducation.${index}.nowCoursing`)}
                      />
                      <label>Experiência em andamento</label>
                    </div>
                  </div>

                  <div className={styles.inputContainer}>
                    <InputForm
                      inputSize="middle"
                      type="date"
                      placeholder="DD/MM/AAAA"
                      title="Início*"
                      id="startDate"
                      error={
                        errors.schoolEducation?.[index]?.startDate?.message
                      }
                      register={register(`schoolEducation.${index}.startDate`)}
                    />

                    <InputForm
                      inputSize="middle"
                      type="date"
                      placeholder="DD/MM/AAAA"
                      title="Término"
                      id="endDate"
                      error={errors.schoolEducation?.[index]?.endDate?.message}
                      register={register(`schoolEducation.${index}.endDate`)}
                    />
                  </div>
                  <button onClick={() => removeSchool(index)}>
                    Remover Formação
                  </button>
                  <div className={styles.line} />
                </div>
              ))}

              <button
                type="button"
                onClick={() => appendSchool(null)}
                className={styles.addButton}
              >
                <FiPlusCircle size={48} />
              </button>
            </>
          )}

          {step === 3 && (
            <>
              {error && (
                <div className={styles.error}>
                  <span>{error}</span>
                </div>
              )}
              <h3>Curso de aperfeiçoamento</h3>

              {coursesFields.map((course, index) => (
                <div key={course.id} className={styles.fieldsContainer}>
                  <div className={styles.inputContainer}>
                    <InputForm
                      inputSize="large"
                      type="text"
                      placeholder="Gerente de Vendas"
                      title="Curso de aperfeiçoamento"
                      id="courseName"
                      error={
                        errors.aditionalCourses?.[index]?.courseName?.message
                      }
                      register={register(
                        `aditionalCourses.${index}.courseName`
                      )}
                    />
                  </div>

                  <div className={styles.inputContainer}>
                    <InputForm
                      inputSize="large"
                      type="text"
                      placeholder="Instituto Federal do Rio Grande do Norte"
                      title="Nome da Instituição"
                      id="schoolName"
                      error={
                        errors.aditionalCourses?.[index]?.schoolName?.message
                      }
                      register={register(
                        `aditionalCourses.${index}.schoolName`
                      )}
                    />
                  </div>

                  <div className={styles.inputContainer}>
                    <SelectForm
                      title="Nível de Conhecimento"
                      id="level"
                      register={register(`aditionalCourses.${index}.level`)}
                    >
                      <option value="" disabled selected>
                        Selecionar
                      </option>
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
                      error={
                        errors.aditionalCourses?.[index]?.totalTime?.message
                      }
                      register={register(`aditionalCourses.${index}.totalTime`)}
                    />
                  </div>

                  <div className={styles.inputContainer}>
                    <div className={styles.checkbox}>
                      <input
                        type="checkbox"
                        {...register(`aditionalCourses.${index}.nowCoursing`)}
                      />
                      <label>Experiência em andamento</label>
                    </div>
                  </div>

                  <div className={styles.inputContainer}>
                    <InputForm
                      inputSize="middle"
                      type="date"
                      placeholder="DD/MM/AAAA"
                      title="Início*"
                      id="startDate"
                      error={
                        errors.aditionalCourses?.[index]?.startDate?.message
                      }
                      register={register(`aditionalCourses.${index}.startDate`)}
                    />

                    <InputForm
                      inputSize="middle"
                      type="date"
                      placeholder="DD/MM/AAAA"
                      title="Término"
                      id="endDate"
                      error={errors.aditionalCourses?.[index]?.endDate?.message}
                      register={register(`aditionalCourses.${index}.endDate`)}
                    />
                  </div>
                  <button onClick={() => removeCourses(index)}>
                    Remover Curso
                  </button>
                  <div className={styles.line} />
                </div>
              ))}

              <button
                type="button"
                onClick={() => appendCourses(null)}
                className={styles.addButton}
              >
                <FiPlusCircle size={48} />
              </button>

              <h3>Habilidades</h3>

              {abilityFields.map((ability, index) => (
                <div key={ability.id} className={styles.fieldsContainer}>
                  <div className={styles.inputContainer}>
                    <InputForm
                      inputSize="large"
                      type="text"
                      placeholder="Experiência em Photoshop"
                      title="Nome da Habilidade, Tecnologia ou Ferramenta"
                      id="abilityname"
                      error={errors.ability?.[index]?.name?.message}
                      register={register(`ability.${index}.name`)}
                    />
                  </div>

                  <div className={styles.inputContainer}>
                    <SelectForm
                      title="Nível de Conhecimento"
                      id="level"
                      register={register(`ability.${index}.level`)}
                    >
                      <option value="" disabled selected>
                        Selecionar
                      </option>
                      <option value="Iniciante">Iniciante</option>
                      <option value="Intermediario">Intermediário</option>
                      <option value="Avançado">Avançado</option>
                    </SelectForm>
                  </div>

                  <button onClick={() => removeAbility(index)}>
                    Remover Habilidade
                  </button>
                  <div className={styles.line} />
                </div>
              ))}

              <button
                type="button"
                onClick={() => appendAbility(null)}
                className={styles.addButton}
              >
                <FiPlusCircle size={48} />
              </button>
            </>
          )}

          {step === 4 && (
            <>
              {error && (
                <div className={styles.error}>
                  <span>{error}</span>
                </div>
              )}
              <h3>Informações sobre deficiência</h3>

              <div className={styles.inputContainer}>
                <InputForm
                  inputSize="small"
                  type="text"
                  placeholder="299.3"
                  title="Número do CID:"
                  id="cidNumber"
                  error={errors.cidNumber?.message}
                  register={register("cidNumber")}
                />

                <InputForm
                  inputSize="large"
                  type="text"
                  placeholder="Perda auditiva parcial"
                  title="Grau de deficiência:"
                  id="graudedeficiencia"
                  error={errors.deficiencyLevel?.message}
                  register={register("deficiencyLevel")}
                />
              </div>

              <div className={styles.inputContainer}>
                <div className={styles.checkbox}>
                  <input type="checkbox" {...register(`haveCertificate`)} />
                  <label>Possuí certificado?</label>
                </div>
              </div>

              <div className={styles.inputContainer}>
                <InputForm
                  inputSize="large"
                  type="text"
                  placeholder="Não preciso de equipamento ou adaptações ou preciso de..."
                  title="Equipamento ou adaptações necessárias"
                  id="equipamento"
                  error={errors.addaptationDescription?.message}
                  register={register("addaptationDescription")}
                />
              </div>

              <div className={styles.inputContainer}>
                <InputForm
                  inputSize="large"
                  type="text"
                  placeholder="Não tenho limitações cotidianas ou tenho limitações com..."
                  title="Limitações cotidianas"
                  id="limitacoes"
                  error={errors.limitationDescription?.message}
                  register={register("limitationDescription")}
                />
              </div>

              <div className={styles.inputContainer}>
                <InputForm
                  inputSize="large"
                  type="text"
                  placeholder="Escreva aqui"
                  title="Informações adicionais"
                  id="infoadicionais"
                  error={errors.aditionalInformation?.message}
                  register={register("aditionalInformation")}
                />
              </div>
            </>
          )}
        </form>
        <div className={styles.next}>
          <div>
            <Player
              autoplay
              loop
              src={animationData}
              style={{ height: "140px", width: "140px" }}
            />
          </div>
          <div className={styles.nextButtonContainer}>
            {step > 0 && (
              <button
                type="button"
                onClick={() => {
                  setStep((s) => s - 1);
                  setError("");
                }}
              >
                VOLTAR
              </button>
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={async () => {
                  const currentStepFields = stepFields[step];
                  const isValid = await trigger(currentStepFields, {
                    shouldFocus: true,
                  });

                  if (!isValid) {
                    setError("Preencha corretamente para prosseguir.");
                    return;
                  }

                  setError("");
                  setStep((s) => s + 1);
                }}
              >
                CONTINUAR
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                onClick={handleSubmit(onSubmit)}
              >
                {loading ? "Carregando..." : "CRIAR CURRÍCULO"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});
