import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { AcessibilityScroll } from "../../../components/AccessibilityScroll";
import { AccountBox } from "../../../components/AccountBox";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "./activate.module.scss";
import api from "../../../services/api";

type LoginProps = {
  confirmPassword: string;
  password: string;
};

export default function Account() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { token } = router.query;

  const schema = yup.object({
    password: yup
      .string()
      .required("A senha é obrigatória")
      .min(6, "É necessário ter mais de 6 catacteres"),
    confirmPassword: yup
      .string()
      .required("A confirmação da senha é obrigatória")
      .min(6, "É necessário ter mais de 6 catacteres"),
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginProps) => {
    const password = data.password;
    const confirmPassword = data.confirmPassword;

    if (password !== confirmPassword) {
      setLoading(false);
      return setError("As duas senhas precisam ser iguais");
    }

    try {
      setLoading(true);

      const newToken = token as string;
      const [sendToken] = newToken.split("%");

      await api.post("/user/recovery/activate", {
        token: sendToken,
        newPassword: password,
      });

      setLoading(false);
      setSuccess("Sua senha foi alterada com sucesso!");
      reset();
      setError(null);
    } catch (err) {
      if (err.response.data.message) {
        setError(err.response.data.message);
      }
      reset();
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.accountContainer}>
        <AcessibilityScroll />

        <AccountBox>
          <div className={styles.success}>
            <p>{success}</p>
          </div>

          <Link href="/account" passHref legacyBehavior>
            <Button styleType="outline">Entrar</Button>
          </Link>
        </AccountBox>
      </div>
    );
  }

  return (
    <div className={styles.accountContainer}>
      <AcessibilityScroll />

      <AccountBox>
        {error && (
          <div className={styles.error}>
            <p>{error}</p>
          </div>
        )}

        <form id="contentform" onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="password"
            id="password"
            placeholder="Nova senha"
            error={errors.password?.message}
            register={register("password")}
          />
          <Input
            type="password"
            id="confirmPassword"
            placeholder="Repita a nova senha"
            error={errors.confirmPassword?.message}
            register={register("confirmPassword")}
          />
          <Button type="submit" form="contentform" disabled={loading}>
            {loading ? "Mudando" : "MUDAR SENHA"}
          </Button>
        </form>
      </AccountBox>
    </div>
  );
}
