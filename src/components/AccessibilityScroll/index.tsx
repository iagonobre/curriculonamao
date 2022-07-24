import { useTheme } from '../../hooks/theme';
import styles from './style.module.scss';

type AcessibilityScrollProps = {
  onlyDevices?: boolean;
}

export function AcessibilityScroll({ onlyDevices = false }) {
  const { changeTheme } = useTheme();

  return (
    <div className={`${onlyDevices ? `${styles.acessibilityScroll} ${styles.onlyDevices}` : styles.acessibilityScroll}`} >
      <button className={styles.iconButton}>
        <img id="invert" src="/assets/text-icon-plus.svg" alt="Aumentar Textos" />
      </button>
      <button className={styles.iconButton}>
        <img id="invert" src="/assets/text-icon.svg" alt="Textos em tamanho padrão" />
      </button>
      <button className={styles.iconButton}>
        <img id="invert" src="/assets/text-icon-less.svg" alt="Diminuir Textos" />
      </button>
      <button onClick={() => changeTheme()} className={styles.iconButton}>
        <img id="invert" src="/assets/contrast.svg" alt="Contraste" />
      </button>
    </div>
  )
}
