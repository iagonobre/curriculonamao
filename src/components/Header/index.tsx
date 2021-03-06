import Link from "next/link";
import styles from './style.module.scss';

import { FiSettings, FiLogOut } from 'react-icons/fi';
import { useTheme } from "../../hooks/theme";

export function Header() {
  const { changeTheme } = useTheme();

  return (
    <header className={styles.headerStyle}>
      <div>
        <Link href="/app">
          <a>
            <img src="/assets/logo.svg" alt="Currículo na Mão" />
          </a>
        </Link>
      </div>
      <div className={styles.buttonContainer}>
        <button>
          <img src="/assets/text-icon-plus.svg" alt="Aumentar Textos" />
        </button>
        <button>
          <img src="/assets/text-icon.svg" alt="Textos em tamanho padrão" />
        </button>
        <button>
          <img src="/assets/text-icon-less.svg" alt="Diminuir Textos" />
        </button>
        <button onClick={() => changeTheme()}>
          <img src="/assets/contrast.svg" alt="Contraste" />
        </button>
        <details>
          <summary className={styles.dropdownTrigger}>
            <img src="/assets/profile.png" alt="" />
          </summary>

          <div className={styles.dropdownContent}>
            <div className={styles.dropUserContent}>
              <p>Iago Nobre Silva</p>
              <small>iagonobre22@gmail.com</small>
            </div>

            <div className={styles.line} />
            <Link passHref href="/app/perfil">
              <button>
                <FiSettings size={20} />
                Editar Perfil
              </button>
            </Link>
            <button>
              <FiLogOut size={20} color="#E33D3D" />
              Sair
            </button>
          </div>
        </details>
      </div>
    </header>
  )
}