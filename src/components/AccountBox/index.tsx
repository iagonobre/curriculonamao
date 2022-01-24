import styles from './style.module.scss';

export function AccountBox({ children }) {
  return (
    <div className={styles.accountBox}>
      {children}
    </div>
  )
}