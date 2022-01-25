import styles from './home.module.scss';

import { Header } from '../../components/Header';

export default function HomeApp() {
  return (
    <>
      <Header></Header>
      <div>
        <p>Você ainda o possui <br />um currículo</p>
        <img src="/assets/homeapp.svg" alt="" />
      </div>
    </>
  )
}