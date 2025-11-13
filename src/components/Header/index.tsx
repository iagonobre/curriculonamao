import Link from "next/link";
import styles from "./style.module.scss";

import { FiSettings, FiLogOut } from "react-icons/fi";
import { useTheme } from "../../hooks/theme";
import { useAuth } from "../../hooks/auth";
import { useFont } from "../../hooks/font";
import Image from "next/image";
import { useRouter } from "next/router";
import { AcessibilityScroll } from "../AccessibilityScroll";

type HeaderProps = {
  withoutProfile?: boolean;
};

export function Header({ withoutProfile }: HeaderProps) {
  const { changeTheme } = useTheme();
  const router = useRouter();
  const { logout } = useAuth();
  const { decreaseFont, turnNormalFont, increaseFont } = useFont();

  const { user } = useAuth();
  const photoURL = user?.photoURL
    ? `${process.env.NEXT_PUBLIC_API_URL}/profile/${user?.photoURL}`
    : "/assets/avatar.svg";

  return (
    <>
      {" "}
      <div className={styles.accessibilityScroll}>
        <AcessibilityScroll />
      </div>
      <header className={styles.headerStyle}>
        <div>
          <Link href="/app" legacyBehavior>
            <a>
              <img src="/assets/logo.svg" alt="Currículo na Mão" />
            </a>
          </Link>
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.accessibilityContainer}>
            <button onClick={() => increaseFont()}>
              <img src="/assets/text-icon-plus.svg" alt="Aumentar Textos" />
            </button>
            <button onClick={() => turnNormalFont()}>
              <img src="/assets/text-icon.svg" alt="Textos em tamanho padrão" />
            </button>
            <button onClick={() => decreaseFont()}>
              <img src="/assets/text-icon-less.svg" alt="Diminuir Textos" />
            </button>
            <button onClick={() => changeTheme()}>
              <img src="/assets/contrast.svg" alt="Contraste" />
            </button>
          </div>
          {!withoutProfile && (
            <details>
              <summary className={styles.dropdownTrigger}>
                <div>
                  <Image
                    src={photoURL}
                    alt="Foto de perfil"
                    width="100"
                    height="100"
                    layout="intrinsic"
                  />
                </div>
              </summary>

              <div className={styles.dropdownContent}>
                <div className={styles.dropUserContent}>
                  <p>{user?.name ?? "Carregando..."}</p>
                  <small>{user?.email ?? "Carregando..."}</small>
                </div>

                <div className={styles.line} />
                <Link passHref href="/app/perfil" legacyBehavior>
                  <button>
                    <FiSettings size={20} />
                    Editar Perfil
                  </button>
                </Link>
                <button
                  onClick={() => {
                    router.push("/");
                    logout();
                  }}
                >
                  <FiLogOut size={20} color="#E33D3D" />
                  Sair
                </button>
              </div>
            </details>
          )}
        </div>
      </header>
    </>
  );
}
