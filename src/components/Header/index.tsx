import Link from "next/link";
import styles from './style.module.scss';

export function Header() {
  return (
    <header className={styles.headerStyle}>
      <div>
        <Link href="/app">
          <a>
          <img src="/assets/logo.svg" alt="Currículo na Mão" />
          </a>
        </Link>
      </div>
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
        <details>
          <summary className={styles.dropdownTrigger}>
            <img src="/assets/profile.png" alt=""/>
          </summary>
          
          <div className={styles.dropdownContent}>
            Dropdown content here…
          </div>
        </details>
      </div>               
    </header>
  )
}