import Link from "next/link";
import styles from './style.module.scss';

export function Header() {
  return (
    <header className={styles.headerStyle}>
      <div>
        <Link href="/">
          <a>
          <img src="/assets/logo.svg" alt="Currículo na Mão" />
          </a>
        </Link>
      </div>
      <div>
        <div>
          <button className={styles.iconButton}>
            <img src="/assets/text-icon-plus.svg" alt="Aumentar Textos" />
          </button>
          <button className={styles.iconButton}>
            <img src="/assets/text-icon.svg" alt="Textos em tamanho padrão" />
          </button>
          <button className={styles.iconButton}>
            <img src="/assets/text-icon-less.svg" alt="Diminuir Textos" />
          </button>
          <button className={styles.iconButton}>
            <img src="/assets/contrast.svg" alt="Contraste" />
          </button>
        </div>
      </div>               
    </header>
  )
}