import Link from "next/link";
import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { AcessibilityScroll } from "../../../components/AccessibilityScroll";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { useAuth } from "../../../hooks/auth";
import { withSSRAuth } from "../../../utils/withSSRAuth";
import styles from "./perfil.module.scss";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { parseCookies } from "nookies";
import api from "../../../services/api";
import Image from "next/image";

type UpdateProps = {
  name: string;
  email: string;
};

type User = {
  id: number;
  email: string;
  name: string;
  refreshToken: string;
  admin?: boolean;
  photoURL: string;
};

export default function Perfil() {
  const { refresh } = useAuth();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>();
  const [error, setError] = useState("");

  useEffect(() => {
    async function getUser() {
      setLoading(true);
      try {
        await refresh();

        const { "@cnm:token": token } = parseCookies();
        const userResponse = await api.get("/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(userResponse.data);
        setValue("name", userResponse.data?.name);
        setValue("email", userResponse.data?.email);

        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }
    getUser();
  }, []);

  const schema = yup.object({
    name: yup.string().required("O nome é obrigatório"),
    email: yup
      .string()
      .email("Precisa ser um e-mail válido")
      .required("O e-mail é obrigatório"),
  });

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const {
    reset: resetImage,
    register: registerImage,
    handleSubmit: handleSubmitImage,
  } = useForm();

  const onSubmit = async (data: UpdateProps) => {
    const email = data.email;
    const name = data.name;

    try {
      setLoading(true);
      await refresh();

      const { "@cnm:token": token } = parseCookies();

      const response = await api.put(
        "/user/edit",
        {
          name,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data);
      reset();
      setValue("name", response.data?.name);
      setValue("email", response.data?.email);

      setLoading(false);
      setError(null);
    } catch (err) {
      if (err?.response.data.message) {
        setError(err.response.data.message);
      }
      reset();
      setLoading(false);
    }
  };

  const onSubmitImage = async (data) => {
    const formData = new FormData();
    formData.append("image", data.file[0]);
    try {
      setLoading(true);
      await refresh();

      const { "@cnm:token": token } = parseCookies();
      const response = await api.post("/profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);
      resetImage();
      setValue("name", response.data?.name);
      setValue("email", response.data?.email);

      setLoading(false);
      setError(null);
    } catch (err) {
      if (err.response.data.message) {
        setError(err.response.data.message);
      }
      reset();
      setLoading(false);
    }
  };

  if (loading && !user) {
    return (
      <>
        <AcessibilityScroll />
        <div className={styles.container}>
          <div className={styles.boxContent}>
            <div className={styles.profileForm}>
              <Link href="/app" legacyBehavior>
                <a>
                  <FiArrowLeft size={20} />
                </a>
              </Link>
              <div className={styles.imageContainer}>
                <img src="/assets/avatar.svg" alt="Foto de perfil" />
                <form
                  id="photo"
                  onChange={handleSubmitImage(onSubmitImage)}
                  className={styles.buttonsContainer}
                >
                  <label htmlFor="file">Escolher imagem</label>
                  <input id="file" type="file" {...registerImage("file")} />
                </form>
              </div>
              <form id="contentform" onSubmit={handleSubmit(onSubmit)}>
                <Input
                  type="text"
                  id="name"
                  disabled
                  error={errors.name?.message}
                  placeholder="Carregando..."
                  register={register("name")}
                />
                <Input
                  type="email"
                  id="email"
                  disabled
                  placeholder="Carregando..."
                  register={register("email")}
                />
                <Button type="submit" disabled form="contentform">
                  Carregando...
                </Button>
              </form>
            </div>
            <div className={styles.line} />
            <div className={styles.profileContent}>
              <h3>Editar Perfil</h3>
              <div />
              <Link href="/recovery" legacyBehavior>
                <a>Alterar minha senha</a>
              </Link>
              <Link href="/privacy" legacyBehavior>
                <a>Política de Privacidade</a>
              </Link>
              <Link href="" legacyBehavior>
                <a>Excluir minha conta</a>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  const photoURL = user?.photoURL
    ? `${process.env.NEXT_PUBLIC_API_URL}/profile/${user?.photoURL}`
    : "/assets/avatar.svg";

  return (
    <>
      <AcessibilityScroll />
      <div className={styles.container}>
        <div className={styles.boxContent}>
          <div className={styles.profileForm}>
            <Link href="/app">
              <a>
                <FiArrowLeft size={20} />
              </a>
            </Link>
            <div className={styles.imageContainer}>
              <Image
                src={photoURL}
                alt="Foto de perfil"
                width="100"
                height="100"
                layout="fixed"
              />
              <form
                id="photo"
                onChange={handleSubmitImage(onSubmitImage)}
                className={styles.buttonsContainer}
              >
                <label htmlFor="file">
                  {loading ? "Enviando..." : "Escolher Imagem"}
                </label>
                <input id="file" type="file" {...registerImage("file")} />
              </form>
            </div>
            <form id="contentform" onSubmit={handleSubmit(onSubmit)}>
              {error && (
                <div className={styles.error}>
                  <p>{error}</p>
                </div>
              )}
              <Input
                type="text"
                id="name"
                error={errors.name?.message}
                register={register("name")}
              />
              <Input
                type="email"
                id="email"
                error={errors.email?.message}
                register={register("email")}
              />
              <Button type="submit" form="contentform" disabled={loading}>
                {loading ? "Enviando..." : "EDITAR"}
              </Button>
            </form>
          </div>
          <div className={styles.line} />
          <div className={styles.profileContent}>
            <h3>Editar Perfil</h3>
            <div />
            <Link href="/recovery" legacyBehavior>
              <a>Alterar minha senha</a>
            </Link>
            <Link href="/privacy" legacyBehavior>
              <a>Política de Privacidade</a>
            </Link>
            <Link href="" legacyBehavior>
              <a>Excluir minha conta</a>
            </Link>
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
