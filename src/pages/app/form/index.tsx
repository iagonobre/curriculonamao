
import { InputForm } from '../../../components/InputForm';
import { Header } from '../../../components/Header';
import styles from './form.module.scss';

export default function Form() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <form className={styles.form} action="">
          <h3>Informações Básicas</h3>

          <div className={styles.inputContainer}>
            <InputForm placeholder="Test2e" title="Nome Completo*" id="name"></InputForm>
            <InputForm type="date" placeholder="Teste" title="Nome Completo*" id="name"></InputForm>
          </div>

        </form>
        <div className={styles.next}>
          <h1>Aqui vai ficar a imagem</h1>
          <h1>Aqui vai ficar a imagem</h1>
          <h1>Aqui vai ficar a imagem</h1>
        </div>
      </div>

    </>
  )
}