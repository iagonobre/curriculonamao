import styles from './style.module.scss';

export function CheckboxForm({ children, ...rest }) {
  return (
    <div className={styles.checkbox} >
      <input type="checkbox" {...rest} />
      <label>{children}</label>
    </div>
  )
}